import { Route, Routes } from "react-router-dom"
import { Feed } from "../components/Feed"
import UserRoutes from "./routeComponents/UserRoutes"
import Write from "../pages/Write"


const AuthorizedOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<UserRoutes />} >
                <Route path="/feed" element={<Feed />} />
                <Route path="/write" element={<Write />}/>
            </Route>
        </Routes>
    </>
  )
}

export default AuthorizedOnly