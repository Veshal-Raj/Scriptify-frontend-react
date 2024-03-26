import { Typography, Box, Card } from '@mui/material';

const SavedBlogs = () => {
  const savedBlogs: any[] = []; 

  return (
    <Box mt={5} textAlign="center">
      {savedBlogs.length === 0 ? (
        <Card sx={{
          borderRadius: '15px',
          width: 'auto', // Default width for all screen sizes
          margin: 'auto',
          '@media (min-width: 600px)': { // Adjust as per your requirements for medium screens
            width: '1000px',
          },
          '@media (min-width: 960px)': { // Adjust as per your requirements for large screens
            width: '1000px',
          },
        }} 
        variant="outlined">
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
