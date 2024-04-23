import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from "react";
import DefaultSkeletionPage from "./components/Skeleton/DefaultSkeletionPage";

const AuthorizedOnly = React.lazy(() => import("./routes/AuthorizedOnly"))
const AdminOnly = React.lazy(() => import("./routes/AdminOnly"))
const UnAuthorizedOnly = React.lazy(() => import("./routes/UnAuthorizedOnly"))
const SuccessPage  = React.lazy(() => import("./pages/SuccessPage"))
const PaymentError = React.lazy(() => import("./pages/PaymentError"))
const SubscriptionPage = React.lazy(() => import("./pages/SubscriptionPage"))

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
              <Route path="/*" element={<Suspense fallback={<DefaultSkeletionPage />}><UnAuthorizedOnly /></Suspense>} />
              <Route path="/success" element={<Suspense fallback={<DefaultSkeletionPage />}><SuccessPage /></Suspense>} />
              <Route path="/cancel" element={<Suspense fallback={<DefaultSkeletionPage />}><PaymentError /></Suspense>} />
              <Route path="/user/*" element={<Suspense fallback={<DefaultSkeletionPage />}><AuthorizedOnly /></Suspense>} />
              <Route path="/admin/*" element={<Suspense fallback={<DefaultSkeletionPage />}><AdminOnly /></Suspense>}/>
              <Route path="/subscription" element={<Suspense fallback={<DefaultSkeletionPage />}><SubscriptionPage   /></Suspense>} />      
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
