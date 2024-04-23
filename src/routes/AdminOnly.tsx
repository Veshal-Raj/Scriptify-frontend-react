import { Route, Routes } from "react-router-dom"
import AdminRoutes from "./routeComponents/AdminRoutes"
import React, { Suspense } from "react"
import DefaultSkeletionPage from "../components/Skeleton/DefaultSkeletionPage"


const Dashboard = React.lazy(() => import('../components/Admin/dashboard/Dashboard'))
const Users = React.lazy(() => import('../components/Admin/Users'))
const Blog = React.lazy(() => import('../components/Admin/blog/Blog'))
const Reports = React.lazy(() => import("../components/Admin/reports/Reports"))

const AdminOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<AdminRoutes />}>
                <Route path="/dashboard" element={<Suspense fallback={<DefaultSkeletionPage />}><Dashboard /></Suspense>} />
                <Route path="/users" element={<Suspense fallback={<DefaultSkeletionPage />}><Users /></Suspense>} />
                <Route path="/blogs" element={<Suspense fallback={<DefaultSkeletionPage />}><Blog /></Suspense>} />
                <Route path="/Reports" element={<Suspense fallback={<DefaultSkeletionPage />}><Reports /></Suspense>} />
            </Route>
        </Routes>
    </>
  )
}

export default AdminOnly