import { useEffect, useState } from 'react';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Drawer, Badge } from '@mui/material';
import { To, useNavigate } from 'react-router-dom';
import DrawerContent from './UI/ProfileDrawer'; // Import the DrawerContent component
import { useQuery } from '@tanstack/react-query';
import { notificationCountApi } from '../api/user';
import { useSelector } from 'react-redux';

interface Props {
    icon: string
}
const MobileFooter = ({ icon }: Props) => {
    const navigate = useNavigate();
    const { userData } = useSelector(state => state.user)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [ notificationCounts, setNotificationCounts ] = useState(0)

    const { data: notificationCount, refetch: refetchNotificationCount } = useQuery({
        queryKey: ['notificationCount'],
        queryFn: ()=> notificationCountApi(userData._id)
      })
    
      useEffect(()=> {
        refetchNotificationCount()
      }, [])

      useEffect(()=>{
        if (notificationCount?.data.response) {
          console.log(notificationCount.data.response)
          setNotificationCounts(notificationCount.data.response)
        }
      },[notificationCount])

    const handleIconClick = (route: To) => {
        navigate(route);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <div className="fixed bottom-0 left-0 w-full mx-auto bg-white border-t border-gray-200 shadow-md lg:hidden">
                <div className="p-5 flex   ">
                    <div className="flex flex-grow justify-evenly gap-x-16">
                        <IconButton onClick={() => handleIconClick('/user/feed')}>
                            <HomeIcon color={icon === 'home' ? 'primary' : 'inherit'} />
                        </IconButton>
                        <IconButton onClick={() => handleIconClick('/user/write')}>
                            <EditNoteSharpIcon color={icon === 'edit' ? 'primary' : 'inherit'} />
                        </IconButton>
                        <IconButton onClick={() => handleIconClick('/user/notifications')}>
                        <Badge badgeContent={notificationCounts} color="primary">
                            <NotificationsNoneSharpIcon color={icon === 'notifications' ? 'primary' : 'inherit'} />
                            </Badge>
                        </IconButton>                        
                        <IconButton onClick={toggleDrawer}>
                            <AccountCircleIcon color={icon === 'account' ? 'primary' : 'inherit'} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <DrawerContent />
            </Drawer>
        </>
    );
};

export default MobileFooter;
