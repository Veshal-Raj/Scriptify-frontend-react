import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, Badge } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./UI/SideBar";
import { useDispatch, useSelector } from "react-redux";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavButton from "./UI/NavButton";
import { Toaster, toast } from 'sonner'
import NavLink from "./UI/NavLink";
import { setBlog } from "../redux/slice/editorSlice";
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "../pages/Write";
import SearchBoxDiv from "./SearchBoxDiv";
import logo from '../assests/imgs/logo.png'
import DrawerContent from "./UI/ProfileDrawer";
import ForumIcon from '@mui/icons-material/Forum';
import { useQuery } from "@tanstack/react-query";
import { notificationCountApi } from "../api/user";


export default function Navbar() {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchDiv, setSearchDiv] = useState(false)
  const [ notificationCounts, setNotificationCounts ] = useState(0)
  // const navigate = useNavigate()

  const { textEditor, setTextEditor, setEditorState } = useContext(EditorContext)

  const isWriteRoute = location.pathname === '/user/write'

  // Function to be called when the Publish button is clicked
  const { blog } = useSelector(state => state.editor);
  const { userData } = useSelector(state => state.user)


  console.log(userData?.role)
  const userRole = userData?.role || 'guest'; // default value 'guest' if userData is null

  const { data: notificationCount, refetch: refetchNotificationCount } = useQuery({
    queryKey: ['notificationCount'],
    queryFn: ()=> notificationCountApi(userData._id)
  })

  useEffect(()=> {
    refetchNotificationCount()
  }, [])

  console.log(' notification count  ---- ', notificationCount)

  useEffect(()=>{
    if (notificationCount?.data.response) {
      console.log(notificationCount.data.response)
      setNotificationCounts(notificationCount.data.response)
    }
  },[notificationCount])
  const handlePublish = () => {

    // Check if title and banner are not empty
    if (!blog.title.trim() || !blog.banner.trim()) {
      toast('Please fill in the title and upload a banner before publishing.!', {
        icon: '⚠️',
      });
      return;
    }
    console.log(textEditor)

    if (textEditor.isReady) {
      // console.log(textEditor)

      textEditor.save().then((data: { blocks: string | unknown[]; }) => {
        if (data.blocks.length) {
          console.log('inside the if block of the textEditor')
          console.log('data --->>> ', data)
          // Dispatch action to update blog content in Redux state
          dispatch(setBlog({ ...blog, content: data }));
          // Change editor state to 'publish'
          dispatch(setEditorState('publish'));
          setEditorState('publish')

        } else {
          toast.error('write something before publish.')
        }
      }).catch((error: unknown) => {
        console.error('Error saving text editor content:', error);
      });
    }

    console.log('Publishing...');
    // navigate('/user/publish');
    console.log('--------------------------------')

  }

  const handleSaveDraft = () => {
    console.log('first')
    navigate('/user/save-draft')
  }

  const handleSearchDiv = () => {
    console.log('clicked')
    setSearchDiv(!searchDiv)

  }

  const handleProfileClick = () => {
    setIsProfileDrawerOpen(!isProfileDrawerOpen);
  };



  return (
    <>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        {searchDiv && <div className="backdrop" onClick={handleSearchDiv} />}
        <AppBar position="static" sx={{
          backgroundColor: "white",
          backgroundSize: "100% 100%",
          borderBottom: "0.1px #000",

        }}>
          <Toolbar>
            {userRole === 'admin' && <SideBar isOpen={true} onClose={false} />}
            <img src={logo} alt="logo" height='30px' width='30' className="gap-2 ml-3 cursor-pointer" onClick={() => navigate('/user/feed')} />
            <Typography variant="h4" component="h5" color="black" display={{ xs: 'none', md: 'block', lg: 'block' }} sx={{ flexGrow: 1, paddingLeft: '5px', cursor: 'pointer' }} onClick={() => navigate('/user/feed')}>
              Scriptify
            </Typography>
            <div className="flex ms-auto">
              {!userData && <NavLink to="/sign-up" text="Sign Up" backgroundColor="#007bff" hoverBackgroundColor="white" color="white" hoverColor="#007bff" />}
              {!userData && <NavLink to="/sign-in" text="Login" variant="contained" backgroundColor="white" hoverBackgroundColor="#007bff" color="#007bff" hoverColor="white" />}
            </div>
            {
              isWriteRoute ? (<div>
                <NavButton text="Publish" backgroundColor="#007bff" hoverBackgroundColor="white" color="white" hoverColor="#007bff" onClick={handlePublish} />
                {/* <NavButton text="Save Draft" variant="contained" backgroundColor="white" hoverBackgroundColor="#007bff" color="#007bff" hoverColor="white" onClick={handleSaveDraft} /> */}
              </div>) : (<></>)
            }
            {!isWriteRoute && userRole === 'user' && <>
              <IconButton sx={{ '& svg': { fontSize: '32px' } }} className="text-black hover:border-black hover:rounded-full mx-5" onClick={handleSearchDiv}>
                <SearchSharpIcon />
              </IconButton>
              <Link to='/user/write'>
                <IconButton sx={{ '& svg': { fontSize: '32px' }, display: { xs: 'none', lg: 'block', xl: 'block' } }} className="text-black hover:border-black hover:rounded-full mx-5 ">
                  <EditNoteSharpIcon /> <span className="text-xl">Write</span>
                </IconButton>
              </Link>
              <Link to='/user/notifications'>
                <IconButton sx={{ '& svg': { fontSize: '32px' }, display: { xs: 'none', lg: 'block', xl: 'block' } }} className="text-black hover:border-black hover:rounded-full mx-5">
                <Badge badgeContent={notificationCounts} color="primary">
                  <NotificationsNoneSharpIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Link to='/user/chat'>
                <IconButton sx={{ '& svg': { fontSize: '30px', paddingTop: '5px' } }}>
                  <ForumIcon />
                </IconButton>
              </Link>
            </>}
            {!isWriteRoute && userData && <IconButton sx={{ '& svg': { fontSize: '32px' }, display: { xs: 'none', lg: 'block', xl: 'block' } }} className="text-black hover:border-black hover:rounded-full mx-5" onClick={handleProfileClick}>
              <AccountCircleIcon />
            </IconButton>}
          </Toolbar>
        </AppBar>
        {searchDiv && ( <SearchBoxDiv setSearchDiv={setSearchDiv} /> )}
        <Drawer anchor="right" open={isProfileDrawerOpen} onClose={handleProfileClick}>
          <DrawerContent />
        </Drawer>
      </Box>
      <Toaster richColors position="top-right" expand={false} />
    </>
  );
}
