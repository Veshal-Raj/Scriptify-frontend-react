import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Box, Drawer, IconButton, List, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assests/imgs/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';

const UserSideBar = () => {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer =
        (open: boolean) =>
            (event:  React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent<HTMLButtonElement>).key === 'Tab' ||
                        (event as React.KeyboardEvent<HTMLButtonElement>).key === 'Shift')
                ) {
                    return;
                }
                setState({ ...state, left: open });
            };

    const location = useLocation();
    const navigate = useNavigate();

    const list = () => (
        <Box
            component="div"
            sx={{
                width: 250,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }} >
                <Link to='/user/feed' className="flex">
                    <img src={logo} alt="logo" height='30px' width='30px' />
                    <Typography variant="h6" sx={{ paddingLeft: '10px' }} onClick={() => navigate('/user/feed')}>
                        Scriptify
                    </Typography>
                </Link>
            </Box>
            <hr />
            <List sx={{ flexGrow: 1 }}>
                {[
                    { text: 'Write', icon: <EditNoteSharpIcon />, path: '/user/write' },
                    { text: 'Notifications', icon: <NotificationsNoneSharpIcon />, path: '/user/notifications' },
                    { text: 'Profile', icon: <AccountCircleIcon />, path: '/user/profile' },
                    { text: 'Logout', icon: <LogoutIcon />, path: '/user/logout' },

                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.path} selected={location.pathname === item.path}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                aria-label="menu"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}

export default UserSideBar;