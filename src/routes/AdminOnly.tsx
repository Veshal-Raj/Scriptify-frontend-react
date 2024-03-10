import { Route, Routes } from "react-router-dom"
import Dashboard from "../components/Admin/Dashboard"
import AdminRoutes from "./routeComponents/AdminRoutes"
import Users from "../components/Admin/Users"
import Blog from "../components/Admin/Blog"
import Reports from "../components/Admin/Reports"


const AdminOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<AdminRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/Reports" element={<Reports />} />
            </Route>
        </Routes>
    </>
  )
}

export default AdminOnly