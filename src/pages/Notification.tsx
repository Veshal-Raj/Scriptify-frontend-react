import { Chip, useMediaQuery } from "@mui/material"
import MobileFooter from "../components/MobileFooter"
import Navbar from "../components/Navbar"
import NotificationBody from "../components/NotificationBody"
import { personAvatarUrl } from "../utils/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUserNotification } from "../api/user";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { timeAgo } from "../hooks/useDate";
import { RootState } from "../redux/appStore";


const Notification = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [allNotificationData, setAllNotificationData] = useState([]);
    const [filterType, setFilterType] = useState('All');

    const { userData } = useSelector((state: RootState) => state.user)
    const userId = userData?._id

    const { data: AllUserNotification, isLoading, refetch: refetchAllUserNotification } = useQuery({
        queryKey: ["initialAllUserNotification"],
        queryFn: async () => {
            if (userId) {
                const result = await fetchAllUserNotification(userId)
                return result
            } else {
                return Promise.resolve({ data: '' });
            }
        }
    })

    useEffect(() => {
        refetchAllUserNotification()
    }, [])

    useEffect(() => {
        if (AllUserNotification?.data.response) {
            setAllNotificationData(AllUserNotification?.data.response);
        }
    }, [AllUserNotification]);

    // Format notification data
    const formatNotification = (data: { type: string; username: string; userImage: string; time: string | number | Date; userId: string; blogBannerImage: string; blogId: string; notificationId: string, seen: boolean }[]) => {
        return data.map((item, index: number) => {
            let text = "";
            let image = personAvatarUrl;
            let timestamp = "";
            let user_id = "";
            let blog_id = "";
            const type = item.type;
            const notificationId = item.notificationId
            const Seen = item.seen

            switch (item.type) {
                case "follow":
                    text = ` ${item.username} followed you.`;
                    image = item.userImage || personAvatarUrl;
                    timestamp = timeAgo(item.time);
                    user_id = item.userId;
                    break;
                case "like":
                    text = `New like on your blog`;
                    image = item.blogBannerImage || personAvatarUrl;
                    timestamp = timeAgo(item.time);
                    blog_id = item.blogId;
                    break;
                case "comment":
                    text = `New comment on your blog`;
                    image = item.blogBannerImage || personAvatarUrl;
                    timestamp = timeAgo(item.time);
                    blog_id = item.blogId;                   
                    break;
                case "save":
                    text = `Your blog have been saved`;
                    image = item.blogBannerImage || personAvatarUrl;
                    timestamp = timeAgo(item.time);
                    blog_id = item.blogId;
                    break;
                default:
                    break;
            }
            return { id: index + 1, text, image, timestamp, user_id, blog_id, type, notificationId, Seen };
        });
    };

    const formattedNotifications = formatNotification(allNotificationData);

    const filters = ["All", "Like", "Comment", "Follow", "Save"];
    
    return (
        <>
            <Navbar />
            {isSmallScreen ? (
                <div className="m-2 p-2 flex gap-2">
                    {filters.map(filter => (
                        <Chip key={filter} label={filter} variant="outlined" color="primary" style={{ cursor: 'pointer' }} onClick={() => setFilterType(filter)} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="m-2 p-2 flex gap-2 ">
                        {filters.map(filter => (
                            <Chip key={filter} label={filter} variant="outlined" color="primary" style={{ cursor: 'pointer' }} onClick={() => setFilterType(filter)} />
                        ))}
                    </div>
                </div>
            )}
            {isSmallScreen ? (
                <div className="m-2 p-2" >
                    <NotificationBody notifications={formattedNotifications} isLoading={isLoading} filterType={filterType} />
                </div>
            ) : (
                <div className="flex justify-center">
                    <NotificationBody notifications={formattedNotifications} isLoading={isLoading} filterType={filterType} />
                </div>
            )}
            <MobileFooter icon="notifications" />
        </>
    );
};
export default Notification