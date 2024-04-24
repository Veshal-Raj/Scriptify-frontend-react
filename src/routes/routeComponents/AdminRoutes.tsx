import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

interface RootState {
    user: {
       userData: any;
    };
    
   }

const AdminRoutes = () => {
    const { userData } = useSelector((state: RootState) => state.user);

    return userData?.role === 'admin' ? <Outlet /> : <Navigate to='/sign-in' />
}

export default AdminRoutes;