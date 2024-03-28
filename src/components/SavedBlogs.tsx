import { Typography, Box, Card, Grid, Paper, CardMedia, CardContent, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { savedBlogsApi } from '../api/user';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getDay } from '../hooks/date';


const SavedBlogs = () => {
  const [ savedBlogs, setSavedBlogs] = useState([])
  const { userData } = useSelector(state => state.user)
  const userId = userData._id
  
  const { data: savedBlogsData } = useQuery({
    queryKey: ["initialQuery"],
    queryFn: () => savedBlogsApi(userId),

  });

  // Update the savedBlogs state when savedBlogsData changes
  useEffect(() => {
    if (savedBlogsData?.data?.response) {
      // setSavedBlogs(savedBlogsData);
      console.log('saved blogs >>> ', savedBlogsData.data.response)
      if (savedBlogsData.data.response.length) {
      setSavedBlogs(savedBlogsData.data.response)

      }
    }
  }, [savedBlogsData]);
  

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
        savedBlogs?.map((blog, index) => (
          <div className="grid grid-cols-1 gap-6 md:min-w-[1000px] min-w-[300px]">
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className='mb-5'
          >
            <Card className="w-full mb-0 flex justify-between p-2" variant="outlined" sx={{ borderRadius: '15px', maxWidth: '1000px' }}>
              <CardContent>
                <Link to={`/user/blog/${blog.blog_id}`} className="text-gray-900">
                  <div className="flex gap-2 items-center mb-7">
                    <Typography variant="body1" component="p" className="line-clamp-1">{blog.author.personal_info.username}</Typography>
                    <Typography variant="body1" component="p" className="min-w-fit">{getDay(blog.publishedAt)}</Typography>
                  </div>
                  <div>
                    <Typography variant="h5" className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 font-serif">{blog.title}</Typography>
                  </div>
                  <div className="flex mt-7 items-center">
                    <Chip label={blog.tags[0]} variant="outlined" color="primary" />
                    <FavoriteBorderIcon className="text-xl ml-5 mr-3" />
                    <Typography variant="body1" component="span" className="flex items-center text-gray-600">{blog.activity.total_likes}</Typography>
                  </div>
                </Link>
              </CardContent>
              <Box className="h-28 aspect-square bg-gray-50 my-auto mx-2" sx={{ maxWidth: 1000 }}>
                <img src={blog.banner} alt={blog.blog_id} className="w-full h-full aspect-square object-cover" />
              </Box>
            </Card>
          </motion.div>
          </div>
        ))
      )}
    </Box>
  );
};

export default SavedBlogs;
