import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link, To, useNavigate } from "react-router-dom";
import logo from '../../assests/imgs/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";

interface RootState {
    user: {
       userData: {
         _id: string;
       };
    };
   }


const DrawerContent = () => {
    const navigate = useNavigate();
    const { userData } =  useSelector((state: RootState) => state.user);
    const userId = userData._id
    const handleItemClick = (route: To) => navigate(route);
    
    const menuItems = [
        { text: "Profile", icon: AccountCircleIcon, route: `/user/${userId}` }, 
        { text: "Change Password", icon: LockIcon, route: "/user/settings/change-password" },
        { text: "Logout", icon: LogoutIcon, route: "/logout" }
    ];
    return (
        <>
           <Box
                sx={{
                    width: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
                role="presentation"
            >
                <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginX: 'auto' }} >
                    <Link to='/user/feed' className="flex">
                        <img src={logo} alt="logo" height='30px' width='30px' />
                        <Typography variant="h6" sx={{ paddingLeft: '10px' }} onClick={() => navigate('/user/feed')}>
                            Scriptify
                        </Typography>
                    </Link>
                </Box>
                <hr />
                <List sx={{ flexGrow: 1, marginX: 'auto' }}>
                {menuItems.map((item, index) => (
                        <ListItem button key={index} onClick={() => handleItemClick(item.route)}>
                            <item.icon style={{ opacity: 0.7, marginRight: '10px' }} /> 
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
};

export default DrawerContent;