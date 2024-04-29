import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link, To, useNavigate } from "react-router-dom";
import logo from '../../assests/imgs/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slice/userSlice";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../../api/user";

interface RootState {
    user: {
        userData: {
            _id: string,
            role: string;
        };
    };
}


const DrawerContent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { userData } = useSelector((state: RootState) => state.user);
    const userId = userData._id
    const role = userData.role

    const { mutate: logout } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logoutApi
    })

    const handleItemClick = (route: To) => {
        if (route === '/logout') {
            logout(userId)
            dispatch(clearUser())
            navigate('/sign-in')
        } else {

            navigate(route);
        }
    }


    let menuItems = [
        // { text: "Change Password", icon: LockIcon, route: "/user/settings/change-password" },
        { text: "Logout", icon: LogoutIcon, route: "/logout" }
    ];

    if (role === "admin") {

        menuItems = [
            { text: "Profile", icon: AccountCircleIcon, route: `/admin/${userId}` },
            { text: "Change Password", icon: LockIcon, route: "/admin/settings/change-password" },
            ...menuItems // Spread existing menu items
        ];
    } else {

        menuItems.unshift({ text: "Profile", icon: AccountCircleIcon, route: `/user/${userId}` },
         { text: "Change Password", icon: LockIcon, route: "/user/settings/change-password" });
    }

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