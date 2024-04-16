import { Route, Routes } from "react-router-dom"
import { Feed } from "../pages/Feed"
import UserRoutes from "./routeComponents/UserRoutes"
import Write from "../pages/Write"
import Profile from "../pages/Profile"
import SingleBlogPage from "../pages/SingleBlogPage"
import Chat from "../pages/Chat"
import { useSelector } from "react-redux"
import { getToken } from "firebase/messaging"
import { messaging } from "../utils/firebase"
import { useEffect } from "react"
import axios from "axios"
import Notification from "../pages/Notification"
import EditUserProfile from "../pages/EditUserProfile"


const AuthorizedOnly = () => {
  const { userData } = useSelector(state => state.user)

  const userId = userData ? userData._id : null; // Add a null check here
  console.log('user id -- ', userId)

  let token: string;

  async function requestPermission() {
    const permission = await window.Notification.requestPermission();
    if (permission === "granted") {
      token = await getToken(messaging, {
        vapidKey: "BDLnANRW7xs9Gl00TM1khbPkd62cPlFDISXiBXQLdF2fBMdCxsAH0ajhBHjkwztEdNwIvksLt40aYWyAwAkTWqk",
      })
      console.log('token -->>  ',token)
    } else if (permission === "denied") {
      alert("You denied for notification")
    }
  }

  useEffect(()=>{
    requestPermission();
    if (userId) { // Check if userId is not null before registering token
      registerToken();
    }
  }, [userId]) 

  const registerToken = async () => {
    await requestPermission()
    try {
      // if ()
      const data = {
        token : token,
        userId: userId
      }
      console.log('data --- ', data)
      await axios.post(import.meta.env.VITE_BASE_URL + 'user/registerNotificationToken', data)

    } catch (error) {
      console.error('Error sending notification ', error);
    }
  }

  return (
    <>
        <Routes>
            <Route element={<UserRoutes />} >
                <Route path="/feed" element={<Feed />} />
                <Route path="/write" element={<Write />}/>
                <Route path="/blog/:blogId" element={<SingleBlogPage />} />
                <Route path="/notifications" element={<Notification />}/>
                <Route path="/:id" element={<Profile />}/>
                <Route path="/chat" element={<Chat />}/> 
                <Route path="/settings/edit-profile" element={<EditUserProfile />}/> 
            </Route>
        </Routes>
    </>
  )
}

export default AuthorizedOnly