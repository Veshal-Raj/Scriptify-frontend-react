import React, { useContext, useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, TextField, Button, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCommentApi, initialCommentsApi } from "../api/user";
import { timeAgo } from "../hooks/useDate";
import { Link } from "react-router-dom";
import { BlogContext } from "./ShowBlogContent";
import { CommentDrawerProps, CommentResponse } from "../@types/Tcomment";
import { BlogData } from "../@types/TuserApi";


const CommentDrawer: React.FC<CommentDrawerProps> = ({ open, onClose, title, commentData }) => {

    const { setSingleBlogData } = useContext(BlogContext);


    const [commentText, setCommentText] = useState(''); // onchange text
    const [comments, setComments] = useState<CommentResponse[]>([]); // comment from the backend
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [commentUser, setCommentUser] = useState('') // user typed comment
    const [isReply, setIsReply] = useState<boolean>(false);
    const [, setParentId] = useState('')



    const { data: initialComments, refetch: refetchInitialComments } = useQuery({
        queryKey: ['initialLoadingComments'],
        queryFn: () => typeof commentData._id === 'string' ? initialCommentsApi(commentData._id) : Promise.reject(new Error('Invalid ID type')),
    })


    const { mutate: commentBlog } = useMutation({
        mutationFn: addCommentApi,
        onSuccess: (response) => {
            const responseData: CommentResponse = response.data.response;
            setComments([responseData, ...comments]);
            setSingleBlogData((prevState: BlogData) => ({
                ...prevState,
                title: prevState.title || '',
                activity: {
                    ...prevState.activity,
                    total_comments: prevState.activity.total_comments + 1
                },
                blogId: typeof prevState.blogId === 'string' ? prevState.blogId : '',
            }));

        }
    })

    useEffect(() => {
        if (open) refetchInitialComments();
    }, [open, refetchInitialComments]);

    useEffect(() => { refetchInitialComments() }, [isReply])

    useEffect(() => {
        if (initialComments) setComments(initialComments.data.response);
    }, [initialComments])


    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => setCommentText(event.target.value);

    const handlePostComment = () => {
        if (commentText.trim() !== "") {
            setCommentUser(commentText);
            setCommentText("");
            setShowEmojiPicker(false)
        }
    };


    useEffect(() => {
        if (commentUser.length) {
            const data = {
                commentData: {
                    ...commentData,
                    userId: commentData.userId ?? '', // Provide a default value if userId is undefined
                    _id: typeof commentData._id === 'string' ? commentData._id : '',
                },
                comment: [commentUser]
            }
            commentBlog(data)
        }
    }, [commentUser, isReply])


    const handleEmojiClick = (event: any) => {
        const selectedEmoji = event.emoji;
        setCommentText(commentText + selectedEmoji);
    };

    const toggleReply = (commentedUserId: string) => {
        console.log('-------', commentedUserId)
        setIsReply(!isReply)
        setParentId(commentedUserId)
    };
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 'auto', padding: "16px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Typography variant="h5" className="">Comments</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </div>
                <Typography variant="body2" className="px-3 pb-5">{title}</Typography>
                <TextField
                    label={isReply ? "Write your reply to the comment" : "Write a comment"}
                    variant="outlined"
                    fullWidth
                    multiline
                    value={commentText}
                    onChange={handleCommentChange}
                    rows={4}
                    style={{ marginBottom: "16px", marginTop: '10px' }}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                <SentimentSatisfiedAltIcon />
                            </IconButton>
                        )
                    }}
                />
                {!isReply ? <Button variant="outlined" color="primary" onClick={handlePostComment} style={{ marginBottom: "16px", borderRadius: '50px' }}>
                    Post Comment
                </Button> : <></>}
                {showEmojiPicker && (<EmojiPicker onEmojiClick={handleEmojiClick} />)}
                <List>
                    {comments.map((comment, index) => (
                        <Box key={index} border={1} borderColor="divider" sx={{ padding: '8px', marginBottom: '8px' }}>
                            <ListItem key={index} alignItems="flex-start" >
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Typography component="span" variant="subtitle1" color="textPrimary" className="capitalize" >
                                                {/* {comment.commentedUser && comment.commentedUser.username ? (
                                                    <Link to={`/user/${comment.commentedUser.id}`}>
                                                        <span className="text-blue-800 cursor-pointer pl-2 underline">@{comment.commentedUser.username}</span>
                                                    </Link>
                                                ) : (
                                                    <span>Unknown User</span>
                                                )} */}
                                                {comment.commentedUser.username}
                                                <Link to={`/user/${comment.commentedUser.id}`}>
                                                    <span className="text-blue-800 cursor-pointer pl-2 underline">@{comment.commentedUser.username}</span>
                                                </Link>
                                            </Typography>
                                            <Typography component="span" variant="body2" color="textSecondary" style={{ marginLeft: '8px' }} >
                                                {timeAgo(comment.commentTime)}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body1" color="textPrimary">
                                                {comment.comment}
                                            </Typography>
                                            {comment.commentId && <Button onClick={() => toggleReply(comment.commentId ?? '')} color="primary">
                                                Reply
                                                {comment.commentId}
                                            </Button>}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Box>
                    ))}
                </List>
            </div>
        </Drawer>
    );
};

export default CommentDrawer;