import { Route, Routes } from "react-router-dom"
import React, { Suspense } from "react";
import NotUserRoutes from "./routeComponents/NotUserRoutes";
import DefaultSkeletionPage from "../components/Skeleton/DefaultSkeletionPage";

const LandingPage  = React.lazy(() => import('../pages/LandingPage'))
const Login = React.lazy(() => import("../pages/Login"))
const Signup = React.lazy(() => import('../pages/signup/Signup'))
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'))
const ChangePasswordNotLogin = React.lazy(() => import('../pages/ChangePasswordNotLogin'))

const UnAuthorizedOnly = () => {
  return (
    <>
      <Routes>
        <Route element={<NotUserRoutes />} >
          <Route path="/" element={<Suspense fallback={<DefaultSkeletionPage />}><LandingPage /></Suspense>} />
          <Route path="/sign-in" element={<Suspense fallback={<DefaultSkeletionPage />}><Login /></Suspense>} />
          <Route path="/sign-up" element={<Suspense fallback={<DefaultSkeletionPage />}><Signup /></Suspense>} />
          <Route path="/forgot-password" element={<Suspense fallback={<DefaultSkeletionPage />}><ForgotPassword /></Suspense>} />
          <Route path="/change-password" element={<Suspense fallback={<DefaultSkeletionPage />}><ChangePasswordNotLogin /></Suspense>} />
        </Route>
      </Routes>
    </>
  )
}

export default UnAuthorizedOnly