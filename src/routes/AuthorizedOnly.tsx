import { Route, Routes } from "react-router-dom"
import { Feed } from "../components/Feed"
import UserRoutes from "../components/UserRoutes"


const AuthorizedOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<UserRoutes />} >
                <Route path="/feed" element={<Feed />} />
            </Route>
        </Routes>
    </>
  )
}

export default AuthorizedOnly