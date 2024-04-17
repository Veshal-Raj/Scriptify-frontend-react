import { Route, Routes } from "react-router-dom"
import Login from '../pages/Login'
import Signup from "../pages/signup/Signup";
import LandingPage from "../pages/LandingPage";
import NotUserRoutes from "./routeComponents/NotUserRoutes";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePasswordNotLogin from "../pages/ChangePasswordNotLogin";

const UnAuthorizedOnly = () => {
  return (
    <>
      <Routes>
        <Route element={<NotUserRoutes />} >
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePasswordNotLogin />} />
        </Route>
      </Routes>
    </>
  )
}

export default UnAuthorizedOnly