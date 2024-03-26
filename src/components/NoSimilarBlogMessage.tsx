import { Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NoSimilarBlogMessage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook inside the component

    const handleExploreBlogs = () => {
        // Navigate to the page where you want to explore more blogs
        navigate('/user/feed');
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    No similar blogs found
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    It seems there are no blogs similar to this one.
                </Typography>
                <Button variant="outlined" color="primary" component={motion.button} onClick={handleExploreBlogs}>
                    Explore More Blogs
                </Button>
            </Grid>
        </Grid>
    );
};

export default NoSimilarBlogMessage;
