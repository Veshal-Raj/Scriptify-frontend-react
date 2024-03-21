import { Route, Routes } from "react-router-dom"
import { Feed } from "../pages/Feed"
import UserRoutes from "./routeComponents/UserRoutes"
import Write from "../pages/Write"
import Profile from "../pages/Profile"


const AuthorizedOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<UserRoutes />} >
                <Route path="/feed" element={<Feed />} />
                <Route path="/write" element={<Write />}/>
                <Route path="/:id" element={<Profile />}/>
            </Route>
        </Routes>
    </>
  )
}

export default AuthorizedOnly