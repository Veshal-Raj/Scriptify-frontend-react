import { Route, Routes } from "react-router-dom"
import Dashboard from "../components/admin/Dashboard"
import AdminRoutes from "../components/routeComponents/AdminRoutes"
import Users from "../components/admin/Users"
import Blog from "../components/admin/Blog"
import Reports from "../components/admin/Reports"


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