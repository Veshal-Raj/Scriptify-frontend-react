import { useQuery } from '@tanstack/react-query';
import { getTrendingBlogs } from '../../../../api/user';
import { useEffect, useState } from 'react';
import BlogPostCardSkeleton from '../../../Skeleton/BlogSkeleton';
import { AnimatePresence } from 'framer-motion';
import MinimalBlogPost from '../../../MinimalBlogPost';
import { motion } from 'framer-motion'
import { Typography } from '@mui/material';

const TopBlogs = () => {
  const [fetchtrendingBlogData, setFetchtrendingBlogData] = useState([])

  const { data: trendingBlogsData, isLoading: trendingblogLoading } = useQuery({
    queryKey: ["trendingBlogsData"],
    queryFn: getTrendingBlogs
  });

  useEffect(() => {
    if (trendingBlogsData) {
      setFetchtrendingBlogData(trendingBlogsData.response || []);
    }
  }, [trendingBlogsData]);


  return (<div  >
  <Typography variant='h5' sx={{ marginTop: 5, marginBottom: 2}}>Trending Blogs</Typography>
    {trendingblogLoading ? (
      <>
        {[...Array(4)].map((_, index) => (
          <BlogPostCardSkeleton key={index} />
        ))}
      </>
    ) : (
      <AnimatePresence>
        {fetchtrendingBlogData.map((blog, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: i * 0.3 }}
          >
            <MinimalBlogPost blog={blog} index={i} />
          </motion.div>
        ))}
      </AnimatePresence>
    )}
  </div>
  )
}

export default TopBlogs