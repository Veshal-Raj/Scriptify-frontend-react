import { Box } from "@mui/material";
import { motion } from "framer-motion";
import NotificationBox from "./NotificationBox";
import { Key } from "react";
import NotificationSkeleton from "./Skeleton/NotificationSkeleton";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { notificationSeenApi } from "../api/user";

interface Notification {
    type: string;
    id: Key;
    text: string;
    image: string;
    timestamp: string;
    user_id?: string;
    blog_id?: string;
    notificationId: string;
    Seen: boolean
}

interface Props {
    notifications: Notification[];
    isLoading: boolean;
    filterType: string;
}



const NotificationBody = ({ notifications, isLoading, filterType }: Props) => {
    
    const filteredNotifications = filterType === 'All' ? notifications : notifications.filter(notification => notification.type === filterType.toLowerCase());
    console.log("filterednotification --- ",filteredNotifications)

    const { mutate: notificationSeen } = useMutation({
        mutationFn: notificationSeenApi
    })

    const handleNotification = async (notificationId: string) => {
        console.log('---------- notification id ------------ ', notificationId)
        const data = {
            notificationId: notificationId
        }
        notificationSeen(data)
    }
    return (
        <Box>
            {isLoading ? (
                <NotificationSkeleton />
            ) : filteredNotifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                filteredNotifications.map((notification, index) => (
                    <Link to={notification.user_id ? `/user/${notification.user_id}` : notification.blog_id ? `/user/blog/${notification.blog_id}` : '/'} key={notification.id}>            
                        <motion.div
                            key={notification.notificationId}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: index * 0.5 }}
                            style={{ marginBottom: "20px" }}   
                            onClick={()=> handleNotification(notification.notificationId)}   
                            className={`notification ${!notification?.Seen ? "bg-blue-100" : ""} rounded-lg`}                  
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