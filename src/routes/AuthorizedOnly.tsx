import { Route, Routes } from "react-router-dom"
import { Feed } from "../pages/Feed"
import UserRoutes from "./routeComponents/UserRoutes"
import Write from "../pages/Write"
import Profile from "../pages/Profile"
import SingleBlogPage from "../pages/SingleBlogPage"
import Chat from "../pages/Chat"


const AuthorizedOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<UserRoutes />} >
                <Route path="/feed" element={<Feed />} />
                <Route path="/write" element={<Write />}/>
                <Route path="/blog/:blogId" element={<SingleBlogPage />} />
                <Route path="/:id" element={<Profile />}/>
                <Route path="/chat" element={<Chat />}/>
            </Route>
        </Routes>
    </>
  )
}

export default AuthorizedOnly