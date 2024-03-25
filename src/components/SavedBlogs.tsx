import { Typography, Box, Card } from '@mui/material';

const SavedBlogs = () => {
  const savedBlogs: any[] = []; 

  return (
    <Box mt={5} textAlign="center">
      {savedBlogs.length === 0 ? (
        <Card sx={{ borderRadius: '15px', maxWidth: '1000px', margin: 'auto' }} variant="outlined">
          <Box p={2}>
            <Typography variant="h6">No saved blogs</Typography>
          </Box>
        </Card>
      ) : (
        savedBlogs.map((blog, index) => (
          <div key={index}>
            {/* Render your saved blog item here */}
            {/* Example: <SavedBlogItem blog={blog} /> */}
          </div>
        ))
      )}
    </Box>
  );
};

export default SavedBlogs;
