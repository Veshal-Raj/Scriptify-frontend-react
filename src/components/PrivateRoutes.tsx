import { useSelector } from "react-redux";
import {  Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
    
    const { userData } = useSelector(state => state.user);
    console.log('----------------------',userData)
    
    return userData ? <Outlet /> : <Navigate to='/sign-in' />
}
