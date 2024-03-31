import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, TextField, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCommentApi, initialCommentsApi } from "../api/user";
import { useSelector } from "react-redux";


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
    commentedUser: {
        id: string;
        username: string;
    };
    comment: string;
    commentTime: string;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({ open, onClose, title, commentData }) => {

    const [commentText, setCommentText] = useState(''); // onchange text
    const [comments, setComments] = useState<CommentResponse[]>([]); // comment from the backend
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
    const [commentUser, setCommentUser] = useState('') // user typed comment
    const [blogComments, setBlogComments] = useState<CommentResponse | null>(null); 

    // const { data: initialBlogQuery } = useQuery({
    //     queryKey: ["initialQuery"],
    //     queryFn: () => initialLikeApi(userId, blogId)
    // })

    const { data: initialComments } = useQuery({
        queryKey: ['initialLoadingComments'],
        queryFn:() => initialCommentsApi
    })

    useEffect(() => {
        if (commentData) {

            initialCommentsApi(commentData._id)
        }
    }, [open])

    console.log('initial comments -- ', initialComments)

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    const handlePostComment = () => {
    
        if (commentText.trim() !== "") {
            setCommentUser(commentText);
            setCommentText("");           
        }
    };
    
        

    const { mutate: commentBlog } = useMutation({
        mutationFn: addCommentApi,
        onSuccess: (response) => {
            const responseData: CommentResponse = response.data.response;
            setComments([responseData ,...comments])
        }
    })
    

    useEffect(()=>{

        if (commentUser.length) {
           
            // create a data object and pass it to the addCommentApi
            const data = {
                commentData: commentData,
                comment: commentUser
            }
            commentBlog(data)
        }
    },[ commentUser ])

    const handleEmojiClick = (event: any) => {
        const selectedEmoji = event.emoji;
        // Append the selected emoji to the comment text
        setCommentText(commentText + selectedEmoji);
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
                    label="Write a comment"
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

                

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handlePostComment}
                    style={{ marginBottom: "16px", borderRadius: '50px' }}
                >
                    Post Comment
                </Button>
                {/* <List>
                    {comments.map((comment, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={comment}
                                style={{
                                    marginTop: "16px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                }}
                            />
                        </ListItem>
                    ))}
                </List> */}
                {showEmojiPicker && (
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                )}
            </div>
        </Drawer>
    );
};

export default CommentDrawer;
