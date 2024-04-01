import { getDay } from "../hooks/useDate";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import avatar from '../assests/imgs/avatar.png'
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author, index }) => {
    const { publishedAt, title, banner, des, tags, activity: { total_likes }, blog_id } = content;
    const { username } = author;
    const truncateString = (str: string, num: number) => {
        if (str?.length > num) {
            return str.slice(0, num) + ' ... Read more';
        } else {
            return str;
        }
    }

    return (
        <motion.div
            transition={{ duration: index, delay: 0.1 }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            className="mx-5 "
        >
            <motion.div
                transition={{ duration: 1, delay: 0.1 }}
                whileHover={{ scale: 1.01 }} className="flex gap-8"
            >
                <Card className="w-full mb-4 flex" variant="outlined" sx={{ borderRadius: '15px', maxWidth: '1000px', }}>
                    <CardContent>
                        <Link to={`/user/blog/${blog_id}`}>
                            <motion.div className="flex gap-2 items-center mb-7">
                                <img src={avatar} alt={blog_id} className="w-6 h-6 rounded-full" />
                                <Typography variant="body1" component="p" className="line-clamp-1">{username}</Typography>
                                <Typography variant="body1" component="p" className="min-w-fit">{getDay(publishedAt)}</Typography>

                            </motion.div>
                            <motion.div>
                                <Typography variant="h5" className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 font-serif">{title}</Typography>
                                <Typography variant="body1" className="my-3 text-xl font-sans leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2"
                                >
                                    {truncateString(des, 80)} </Typography>
                            </motion.div>
                            <motion.div className="flex   mt-7">

                                <Chip label={tags[0]} variant="outlined" color="primary" />
                                <FavoriteBorderIcon className="text-xl ml-5 mr-3" />
                                <Typography variant="body1" component="span" className="flex items-center text-gray-600 ">{total_likes}</Typography>
                            </motion.div>
                        </Link>
                    </CardContent>
                    <Box className="h-28 aspect-square bg-gray-50  my-auto mx-2"  sx={{ maxWidth: 1000 }}>
                        <img src={banner} alt={blog_id} className="w-full h-full aspect-square object-cover" />
                    </Box>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default BlogPostCard;
