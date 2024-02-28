import { Route, Routes } from "react-router-dom"
import Login from '../pages/Login'
import Signup from "../pages/signup/Signup";
import LandingPage from "../pages/LandingPage";
import NotUserRoutes from "../components/routeComponents/NotUserRoutes";

const UnAuthorizedOnly = () => {
  return (
    <>
      <Routes>
        <Route element={<NotUserRoutes />} >
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default UnAuthorizedOnly