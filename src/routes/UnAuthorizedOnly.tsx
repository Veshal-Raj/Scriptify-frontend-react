import { useSelector } from "react-redux"
import {  Outlet, Navigate, useLocation } from "react-router-dom";


const UnAuthorizedOnly = () => {
    const { userData } = useSelector(state => state.user);
    const location = useLocation()

  return userData?.role === null ? (
    <Outlet />
  ) : userData?.role === "admin" ? (
    <Navigate to='/admin/dashboard' state={{ from: location }} replace={true} />
  ) : (
    <Navigate to ='/feed' />
  )
}

export default UnAuthorizedOnly