import { useSelector } from "react-redux";
import {  Outlet, Navigate } from "react-router-dom";

interface RootState {
    user: {
       userData: any;
    };
    
   }

export default function UserRoutes() {
    
    const { userData } = useSelector((state: RootState) => state.user);
    console.log('----------------------',userData)
    
    return userData?.role === 'user' ? <Outlet /> : <Navigate to='/sign-in' />
}
