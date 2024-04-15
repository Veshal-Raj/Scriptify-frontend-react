import { Box } from "@mui/material";
import { motion } from "framer-motion";
import NotificationBox from "./NotificationBox";
import { Key } from "react";
import NotificationSkeleton from "./Skeleton/NotificationSkeleton";
import { Link } from "react-router-dom";

interface Notification {
    id: Key;
    text: string;
    image: string;
    timestamp: string;
    user_id?: string;
    blog_id?: string
}

interface Props {
    notifications: Notification[];
    isLoading: boolean;
}

const NotificationBody = ({ notifications, isLoading }: Props) => {
   

    return (
        <Box >
            {isLoading ? (
                <NotificationSkeleton />
            ) : (
                notifications.map((notification, index) => (
                    <Link to={notification.user_id ? `/user/${notification.user_id}` : notification.blog_id ? `/user/blog/${notification.blog_id}` : '/'} key={notification.id}>            
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: index * 0.5 }}
                        style={{ marginBottom: "20px" }}                        
                    >
                        <NotificationBox text={notification.text} image={notification.image} timestamp={notification.timestamp} />
                    </motion.div>
                    </Link>
                ))
            )}                
        </Box>
    );
};

export default NotificationBody;