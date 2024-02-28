import { useSelector } from "react-redux";
import {  Outlet, Navigate } from "react-router-dom";

export default function UserRoutes() {
    
    const { userData } = useSelector(state => state.user);
    console.log('----------------------',userData)
    
    return userData?.role === 'user' ? <Outlet /> : <Navigate to='/sign-in' />
}
