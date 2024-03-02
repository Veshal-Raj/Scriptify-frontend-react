import { Box, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./UI/SideBar";
import { useSelector } from "react-redux";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavButton from "./UI/NavButton";


export default function Navbar() {
  const location = useLocation();
  const isWriteRoute = location.pathname === '/user/write'
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
            {!userData && <NavButton to="/sign-up" text="Sign Up" backgroundColor="#007bff" hoverBackgroundColor="white" color="white" hoverColor="#007bff" />}
            {!userData && <NavButton to="/sign-in" text="Login" variant="contained" backgroundColor="white" hoverBackgroundColor="#007bff" color="#007bff" hoverColor="white" />}
            {
              isWriteRoute ? (<div>
                <NavButton to="/user/publish" text="Publish" backgroundColor="#007bff" hoverBackgroundColor="white" color="white" hoverColor="#007bff" />
                <NavButton to="/user/save-draft" text="Save Draft" variant="contained" backgroundColor="white" hoverBackgroundColor="#007bff" color="#007bff" hoverColor="white" />

              </div>) : (<></>)
            }
            {!isWriteRoute && userRole === 'user' && <>
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
            {!isWriteRoute && userData && <IconButton sx={{ '& svg': { fontSize: '32px' } }} className="text-black hover:border-black hover:rounded-full mx-5">
              <AccountCircleIcon />
            </IconButton>}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
