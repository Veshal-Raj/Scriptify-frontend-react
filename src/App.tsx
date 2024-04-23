import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from "react";

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
              <Route path="/*" element={<Suspense fallback={<div>Loading...</div>}><UnAuthorizedOnly /></Suspense>} />
              <Route path="/success" element={<Suspense fallback={<div>Loading...</div>}><SuccessPage /></Suspense>} />
              <Route path="/cancel" element={<Suspense fallback={<div>Loading...</div>}><PaymentError /></Suspense>} />
              <Route path="/user/*" element={<Suspense fallback={<div>Loading...</div>}><AuthorizedOnly /></Suspense>} />
              <Route path="/admin/*" element={<Suspense fallback={<div>Loading...</div>}><AdminOnly /></Suspense>}/>
              <Route path="/subscription" element={<Suspense fallback={<div>Loading...</div>}><SubscriptionPage   /></Suspense>} />      
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
