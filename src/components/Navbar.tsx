import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./UI/SideBar";
import { useSelector } from "react-redux";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavButton from "./UI/NavButton";
import toast, { Toaster } from "react-hot-toast";
import NavLink from "./UI/NavLink";


export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate()

  const isWriteRoute = location.pathname === '/user/write'

  // Function to be called when the Publish button is clicked
  const { blog } = useSelector(state => state.editor);
  const { userData } = useSelector(state => state.user)

  console.log(userData?.role)
  const userRole = userData?.role || 'guest'; // default value 'guest' if userData is null


  const handlePublish = () => {

    // Check if title and banner are not empty
    if (!blog.title.trim() || !blog.banner.trim()) {
      toast('Please fill in the title and upload a banner before publishing.!', {
        icon: '⚠️',
      });
      return;
    }

    console.log('Publishing...');
    navigate('/user/publish');
    console.log('--------------------------------')

  }

  const handleSaveDraft = () => {
    console.log('first')
    navigate('/user/save-draft')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{
          backgroundColor: "white",
          backgroundSize: "100% 100%",
          borderBottom: "0.1px #000",
        }}>
          <Toolbar>
            {userRole === 'admin' && <SideBar isOpen={true} onClose={false} />}
            <Typography variant="h4" component="h5" color="black" sx={{ flexGrow: 1, paddingLeft: 5, margin: 2 }}>
              Scriptify
            </Typography>
            {!userData && <NavLink to="/sign-up" text="Sign Up" backgroundColor="#007bff" hoverBackgroundColor="white" color="white" hoverColor="#007bff" />}
            {!userData && <NavLink to="/sign-in" text="Login" variant="contained" backgroundColor="white" hoverBackgroundColor="#007bff" color="#007bff" hoverColor="white" />}
            {
              isWriteRoute ? (<div>
                <NavButton  text="Publish" backgroundColor="#007bff" hoverBackgroundColor="white" color="white" hoverColor="#007bff" onClick={handlePublish} />
                <NavButton  text="Save Draft" variant="contained" backgroundColor="white" hoverBackgroundColor="#007bff" color="#007bff" hoverColor="white" onClick={handleSaveDraft} />
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
      <Toaster />
    </>
  );
}
