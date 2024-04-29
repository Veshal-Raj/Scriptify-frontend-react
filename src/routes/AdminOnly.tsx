import { Route, Routes } from "react-router-dom"
import AdminRoutes from "./routeComponents/AdminRoutes"
import React, { Suspense } from "react"
import DefaultSkeletionPage from "../components/Skeleton/DefaultSkeletionPage"
// import SingleBlogPage from "../pages/SingleBlogPage"


const Dashboard = React.lazy(() => import('../components/Admin/dashboard/Dashboard'))
const Users = React.lazy(() => import('../components/Admin/Users'))
const Blog = React.lazy(() => import('../components/Admin/blog/Blog'))
const Reports = React.lazy(() => import("../components/Admin/reports/Reports"))
const Profile = React.lazy(() => import('../pages/Profile'))
const EditUserProfile = React.lazy(() => import('../pages/EditUserProfile'))
const ChangePassword = React.lazy(() => import('../pages/ChangePassword'))
const SingleBlogPage = React.lazy(() => import("../pages/SingleBlogPage"))

const AdminOnly = () => {
  return (
    <>
        <Routes>
            <Route element={<AdminRoutes />}>
                <Route path="/dashboard" element={<Suspense fallback={<DefaultSkeletionPage />}><Dashboard /></Suspense>} />
                <Route path="/users" element={<Suspense fallback={<DefaultSkeletionPage />}><Users /></Suspense>} />
                <Route path="/blogs" element={<Suspense fallback={<DefaultSkeletionPage />}><Blog /></Suspense>} />
                <Route path="/Reports" element={<Suspense fallback={<DefaultSkeletionPage />}><Reports /></Suspense>} />
                <Route path="/blog/:blogId" element={<Suspense fallback={<DefaultSkeletionPage />}><SingleBlogPage /></Suspense>} />
                <Route path="/:id" element={<Suspense fallback={<DefaultSkeletionPage />}><Profile /></Suspense>}/>
                <Route path="/settings/edit-profile" element={<Suspense fallback={<DefaultSkeletionPage />}><EditUserProfile /></Suspense>}/>
                <Route path="/settings/change-password" element={<Suspense fallback={<DefaultSkeletionPage />}><ChangePassword /></Suspense>}/>  
            </Route>
        </Routes>
    </>
  )
}

export default AdminOnly