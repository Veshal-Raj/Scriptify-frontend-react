import { Route, Routes } from "react-router-dom"
import UserRoutes from "./routeComponents/UserRoutes"
import { useSelector } from "react-redux"
import { getToken } from "firebase/messaging"
import { messaging } from "../utils/firebase"
import React, { Suspense, useEffect } from "react"
import axios from "axios"
import DefaultSkeletionPage from "../components/Skeleton/DefaultSkeletionPage"



const Feed = React.lazy(() => import("../pages/Feed"))
const Write = React.lazy(() => import("../pages/Write"))
const SingleBlogPage = React.lazy(() => import("../pages/SingleBlogPage"))
const Notification = React.lazy(() => import("../pages/Notification"))
const Profile = React.lazy(() => import("../pages/Profile"))
const Chat = React.lazy(() => import('../pages/Chat'))
const EditUserProfile = React.lazy(() => import('../pages/EditUserProfile'))
const ChangePassword = React.lazy(() => import('../pages/ChangePassword'))

interface RootState {
  user: {
     userData: any;
  };
 }

const AuthorizedOnly = () => {
  const { userData } = useSelector((state: RootState) => state.user)

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
                <Route path="/feed" element={<Suspense fallback={<DefaultSkeletionPage />}><Feed /></Suspense> } />
                <Route path="/write" element={<Suspense fallback={<DefaultSkeletionPage />}><Write /></Suspense>}/>
                <Route path="/blog/:blogId" element={<Suspense fallback={<DefaultSkeletionPage />}><SingleBlogPage /></Suspense>} />
                <Route path="/notifications" element={<Suspense fallback={<DefaultSkeletionPage />}><Notification /></Suspense>}/>
                <Route path="/:id" element={<Suspense fallback={<DefaultSkeletionPage />}><Profile /></Suspense>}/>
                <Route path="/chat" element={<Suspense fallback={<DefaultSkeletionPage />}><Chat /></Suspense>}/> 
                <Route path="/settings/edit-profile" element={<Suspense fallback={<DefaultSkeletionPage />}><EditUserProfile /></Suspense>}/> 
                <Route path="/settings/change-password" element={<Suspense fallback={<DefaultSkeletionPage />}><ChangePassword /></Suspense>}/> 
            </Route>
        </Routes>
    </>
  )
}

export default AuthorizedOnly