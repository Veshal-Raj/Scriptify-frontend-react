import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

interface RootState {
    user: {
       userData: any;
    };
    
   }


export default function NotUserRoutes() {
    const { userData } = useSelector((state: RootState) => state.user);

    if (!userData) {
        return <Outlet />;
    } else {
        if (userData.role === "user") {
            return <Navigate to='/user/feed' />;
        } else if (userData.role === "admin") {
            return <Navigate to='/admin/dashboard' />;
        } else {
            return <Navigate to='/sign-in' />;
        }
    }
}
