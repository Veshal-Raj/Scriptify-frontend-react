import { Route, Routes } from "react-router-dom"
import Dashboard from "../components/Dashboard"
import AdminRoutes from "../components/AdminRoutes"


const AdminOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<AdminRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route /> */}
                {/* <Route /> */}
            </Route>
        </Routes>
    </>
  )
}

export default AdminOnly