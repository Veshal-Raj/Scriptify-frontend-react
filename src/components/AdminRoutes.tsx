import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const AdminRoutes = () => {
    const { userData } = useSelector(state => state.user);

    return userData?.role === 'admin' ? <Outlet /> : <Navigate to='/sign-in' />
}

export default AdminRoutes;