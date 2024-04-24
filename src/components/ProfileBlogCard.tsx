import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getDay } from "../hooks/useDate";
import { useEffect } from "react";

interface ProfileBlogCardProps {
  blog: {
     activity: {
       total_likes?: number | undefined;
     };
     blog_id?: string | undefined;
     title?: string | undefined;
     banner?: string | undefined;
     tags?: string[] | undefined;
     publishedAt: string | number | Date;
  };
  index: number;
  username?: string;
  ProfileId?: string | undefined;
 }

const  ProfileBlogCard: React.FC<ProfileBlogCardProps> = ({ blog, index, username, ProfileId }) => {
  const { activity, blog_id, title, banner, tags, publishedAt } = blog;
  const { total_likes } = activity;


  useEffect(() => {
    console.log("ProfileId changed:", ProfileId);
  }, [ProfileId]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    >
      <Card className="w-full mb-0 flex justify-between p-2" variant="outlined" sx={{ borderRadius: '15px', maxWidth: '1000px', }}>
        <CardContent>
          <Link to={`/user/blog/${blog_id}`}>
            <div className="flex gap-2 items-center mb-7">
              <Typography variant="body1" component="p" className="line-clamp-1">{username}</Typography>
              <Typography variant="body1" component="p" className="min-w-fit">{getDay(publishedAt)}</Typography>
            </div>
            <div>
              <Typography variant="h5" className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 font-serif">{title}</Typography>
            </div>
            <div className="flex mt-7">
              {tags && tags.length > 0 && <Chip label={tags[0]} variant="outlined" color="primary" />}
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