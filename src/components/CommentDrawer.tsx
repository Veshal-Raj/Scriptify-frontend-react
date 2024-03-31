import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, TextField, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';


interface CommentDrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({ open, onClose, title }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<string[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    const handlePostComment = () => {
        if (commentText.trim() !== "") {
            setComments([...comments, commentText]);
            setCommentText("");
        }
    };

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
                <List>
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
                </List>
                {showEmojiPicker && (
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                )}
            </div>
        </Drawer>
    );
};

export default CommentDrawer;
