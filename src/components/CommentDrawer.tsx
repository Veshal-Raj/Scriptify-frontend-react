import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, TextField, Button, Typography, IconButton, Box, Collapse } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCommentApi, initialCommentsApi, replyCommentApi } from "../api/user";
import { useSelector } from "react-redux";
import { timeAgo } from "../hooks/useDate";
import { Link } from "react-router-dom";


interface CommentDrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    commentData: {
        userId: string;
        authorId: string;
        blogId: string;
        _id: string;
    };
    
}

interface CommentResponse {
    commentId?: string,
    commentedUser: {
        id: string;
        username: string;
    };
    comment: string;
    commentTime: string;
}

// interface CommentItemProps {
//     comment: Comment;
//     index: number;
// }

const CommentDrawer: React.FC<CommentDrawerProps> = ({ open, onClose, title, commentData }) => {

    const [commentText, setCommentText] = useState(''); // onchange text
    const [comments, setComments] = useState<CommentResponse[]>([]); // comment from the backend
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
    const [commentUser, setCommentUser] = useState('') // user typed comment
    const [blogComments, setBlogComments] = useState<CommentResponse | null>(null); 
    const [isReply, setIsReply] = useState<boolean>(false);
    const [parentId, setParentId] = useState('')



    const { data: initialComments, refetch: refetchInitialComments } = useQuery({
        queryKey: ['initialLoadingComments'],
        queryFn:() => initialCommentsApi(commentData._id)
    })

    
    const { mutate: commentBlog } = useMutation({
        mutationFn: addCommentApi,
        onSuccess: (response) => {
            const responseData: CommentResponse = response.data.response;
            setComments([responseData ,...comments])
        }
    })
    

    const { mutate: replyCommentBlog } = useMutation({
        mutationFn: replyCommentApi,
        onSuccess: (response) => {
            console.log('response of reply comment ', response)
        }
    })


    useEffect(() => {
        if (open) {
            refetchInitialComments(); // Fetch initial comments when the drawer is opened
        }
    }, [open, refetchInitialComments]); 

    useEffect(()=>{
        refetchInitialComments()
        console.log('is reply')
    },[isReply])

    useEffect(()=> {
        if (initialComments) {
            setComments(initialComments.data.response);
        }
    },[ initialComments])

    

    console.log('initial comments -- ', comments)

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    const handlePostComment = () => {
    
        if (commentText.trim() !== "") {
            setCommentUser(commentText);
            setCommentText("");    
            setShowEmojiPicker(false)       
        }
    };
    
    
    const handleReplyComment =()=> {
        const comment = commentText
        console.log('parent id and comment', parentId, comment)
        
        if (parentId && commentText.trim() !== "") {
                    const data = {
                        parentCommentId: parentId,
                        commentData: commentData,
                        comment: commentText
                    }
        
                    console.log('reply comment >>>> ', data)
                    replyCommentBlog(data)
                }
    }


    useEffect(()=>{

        if (commentUser.length) {
           
            // create a data object and pass it to the addCommentApi
            const data = {
                commentData: commentData,
                comment: commentUser
            }
            commentBlog(data)
        }
    },[ commentUser, isReply ])

    // useEffect(()=> {
    //     if (commentUser.length) {
    //         const data = {
    //             parentCommentId: parentId,
    //             comment: commentUser
    //         }

    //         console.log('reply comment >>>> ', data)
    //     }
    // }, [])

    const handleEmojiClick = (event: any) => {
        const selectedEmoji = event.emoji;
        // Append the selected emoji to the comment text
        setCommentText(commentText + selectedEmoji);
      };


    
    
        const toggleReply = (commentedUserId: string) => {
            console.log('comments >>> ', comments)
            console.log('commentedUserId ', commentedUserId)
            setIsReply(!isReply)
            // return
            setParentId(commentedUserId)
            
    
            if (commentUser.length) {
                const data = {
                    parentCommentId: commentedUserId,
                    comment: commentUser
                }
    
                console.log('reply comment >>>> ', data)
            }
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
                    label={isReply ? "Write your reply to the comment":"Write a comment"}
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

                

                { !isReply ?<Button
                    variant="outlined"
                    color="primary"
                    onClick={handlePostComment}
                    style={{ marginBottom: "16px", borderRadius: '50px' }}
                >
                    Post Comment
                </Button> :
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={()=>handleReplyComment}
                    style={{ marginBottom: "16px", borderRadius: '50px' }}
                >
                    Reply Comment
                </Button>}
                {showEmojiPicker && (
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                )}
                <List>
    {comments.map((comment, index) => (
        
        <Box key={index} border={1} borderColor="divider" sx={{ padding: '8px', marginBottom: '8px' }}>
        <ListItem key={index} alignItems="flex-start" >
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="textPrimary"
                            className="capitalize"
                        >
                            {comment.commentedUser.username}
                            <Link to={`/user/${comment.commentedUser.id}`}>
                            <span className="text-blue-800 cursor-pointer pl-2 underline">@{comment.commentedUser.username}</span>
                            </Link>
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                            style={{ marginLeft: '8px' }}
                        >
                            
                            {timeAgo(comment.commentTime)}
                        </Typography>
                           
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body1"
                            color="textPrimary"
                        >
                            {comment.comment}
                        </Typography>

                        {comment.commentId ?<Button onClick={() =>toggleReply(comment.commentId)} color="primary">
                                Reply
                                {comment.commentId}
                            </Button>: <></>}
                           
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
