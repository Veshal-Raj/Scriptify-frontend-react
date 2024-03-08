import { getDay } from "../hooks/date";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Chip } from '@mui/material';

const BlogPostCard = ({ content, author }) => {
    const { publishedAt, title, banner, des, tags, activity: { total_likes }, blog_id } = content;
    const { username } = author;

    return (
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <Card className="w-full mb-4" variant="outlined" sx={{ borderRadius: '15px', maxWidth: '1000px' }}>
                <CardContent>
                    <motion.div className="flex gap-2 items-center mb-7">
                        <img src='' alt={blog_id} className="w-6 h-6 rounded-full" />
                        <Typography variant="body1" component="p" className="line-clamp-1">{username}</Typography>
                        <Typography variant="body1" component="p" className="min-w-fit">{getDay(publishedAt)}</Typography>
                        <motion.img src={banner} alt={blog_id} height="100px" width="150px" /> {/* Set height and width here */}
                    </motion.div>
                    <motion.div>
                        <Typography variant="h5" className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 font-serif">{title}</Typography>
                        <Typography variant="body1" className="my-3 text-xl font-sans leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">{des}</Typography>
                    </motion.div>
                    <motion.div className="flex gap-4 mt-7">
                        <Chip label={tags[0]} variant="outlined" color="primary" />
                        <FavoriteBorderIcon className="text-xl " />
                        <Typography variant="body1" component="span" className="flex items-center gap-1 text-gray-600 ">{total_likes}</Typography>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default BlogPostCard;
