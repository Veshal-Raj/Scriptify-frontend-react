import React, { useState } from 'react';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DrawerContent from './UI/ProfileDrawer'; // Import the DrawerContent component

const MobileFooter = ({ icon }) => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleIconClick = (route) => {
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
                            <NotificationsNoneSharpIcon color={icon === 'notifications' ? 'primary' : 'inherit'} />
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
