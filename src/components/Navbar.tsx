import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SideBar from "./UI/SideBar";
import { useSelector } from "react-redux";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Navbar() {
  const { userData } = useSelector(state => state.user)
  console.log(userData?.role)
  const userRole = userData?.role || 'guest'; // default value 'guest' if userData is null
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{
          backgroundColor: "white",
          backgroundSize: "100% 100%",
          borderBottom: "0.1px  #000",
        }}>
          <Toolbar>
            {userRole === 'admin' && <SideBar isOpen={true} onClose={false} />}
            <Typography variant="h4" component="h5" color="black" sx={{ flexGrow: 1, paddingLeft: 5, margin: 2 }}>
              Scriptify
            </Typography>
            {!userData && <Link to="/sign-up" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" sx={{
                paddingX: '20px',
                paddingY: '10px',
                borderRadius: '45px',
              }}>Sign Up</Button>
            </Link>}
            {!userData && <Link to='/sign-in' style={{ textDecoration: 'none' }}>
              <Button variant="outlined" sx={{
                paddingX: '20px',
                paddingY: '10px',
                borderRadius: '45px',
                marginX: '5px',
                color: 'white', // White text color
                backgroundColor: '#007bff', // Black background color
                '&:hover': {
                  backgroundColor: 'white', // White background color on hover
                  color: 'black', // Black text color on hover
                },
                transition: 'background-color 0.3s, color 0.3s',
              }}>Login</Button>
            </Link>}
           {userRole === 'user' && <>
           <IconButton sx={{ '& svg': { fontSize: '32px' } }} className="text-black hover:border-black hover:rounded-full mx-5">
              <SearchSharpIcon />
            </IconButton>
            <Link to='/user/write'>

            <IconButton sx={{ '& svg': { fontSize: '32px' } }} className="text-black hover:border-black hover:rounded-full mx-5">
              <EditNoteSharpIcon /> <span className="text-xl">Write</span>
            </IconButton>
            </Link>
            <IconButton sx={{ '& svg': { fontSize: '32px' } }} className="text-black hover:border-black hover:rounded-full mx-5">
              <NotificationsNoneSharpIcon />
            </IconButton>
           </>}
            {userData && <IconButton sx={{ '& svg': { fontSize: '32px' } }} className="text-black hover:border-black hover:rounded-full mx-5">
              <AccountCircleIcon />
            </IconButton>}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
