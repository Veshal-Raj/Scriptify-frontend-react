import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CardContent, Typography } from '@mui/material';
import { getDay } from '../hooks/useDate';

interface Blog {
    publishedAt: string;
    title: string;
    author: {
       personal_info: {
         username: string;
       };
    };
    blog_id: string;
   }

   interface MinimalBlogPostProps {
    blog: Blog;
    index: number;
   }

   
const MinimalBlogPost = ({ blog, index }: MinimalBlogPostProps) => {
    const { publishedAt, title, author: { personal_info: { username } }, blog_id } = blog;

    return (
        <Link to={`/user/blog/${blog_id}`} className="flex gap-5 mb-4 mx-5 border p-5 max-w-[1000px] rounded-lg ">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: index * 0.7 }}
                className="flex gap-2 items-center mb-7"
            >
                <Typography variant="h1" component="h1" className="text-4xl sm:text-3xl lg:text-5xl font-bold text-grey leading-none">
                    {index < 10 ? "0" + (index + 1) : index }
                </Typography>
            </motion.div>
            <CardContent className="">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: index * 0.7 }}
                    className="flex gap-2 items-center mb-7"
                >
                    <Typography variant="body1" component="p" className="line-clamp-1">{username}</Typography>
                    <Typography variant="body1" component="p" className="min-w-fit">{getDay(publishedAt)}</Typography>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: index * 0.7 }}
                >
                    <Typography variant="h5" className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 font-serif">{title}</Typography>
                </motion.div>
            </CardContent>
        </Link>
    );
};

export default MinimalBlogPost;