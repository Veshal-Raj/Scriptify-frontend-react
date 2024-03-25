import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getDay } from "../hooks/date";

const ProfileBlogCard = ({ blog, index, username }) => {
  const { activity, blog_id, title, banner, tags,publishedAt } = blog;
  const { total_likes } = activity;

  return   (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    //   className="flex flex-col"
    >
      <Card className="w-full mb-0 flex justify-between p-2" variant="outlined" sx={{ borderRadius: '15px', maxWidth: '1000px', }}>
        <CardContent>
          <Link to={`/user/blog/${blog_id}`}>
            <div className="flex gap-2 items-center mb-7">
              {/* <img src={avatar} alt={blog_id} className="w-6 h-6 rounded-full" /> */}
              <Typography variant="body1" component="p" className="line-clamp-1">{username}</Typography>
              <Typography variant="body1" component="p" className="min-w-fit">{getDay(publishedAt)}</Typography>
            </div>
            <div>
              <Typography variant="h5" className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 font-serif">{title}</Typography>
            </div>
            <div className="flex mt-7">
              <Chip label={tags[0]} variant="outlined" color="primary" />
              <FavoriteBorderIcon className="text-xl ml-5 mr-3" />
              <Typography variant="body1" component="span" className="flex items-center text-gray-600 ">{total_likes}</Typography>
            </div>
          </Link>
        </CardContent>
        <Box className="h-28 aspect-square bg-gray-50  my-auto mx-2" sx={{ maxWidth: 1000 }}>
          <img src={banner} alt={blog_id} className="w-full h-full aspect-square object-cover" />
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProfileBlogCard;
