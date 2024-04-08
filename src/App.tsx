import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthorizedOnly from "./routes/AuthorizedOnly";
import AdminOnly from "./routes/AdminOnly";
import UnAuthorizedOnly from "./routes/UnAuthorizedOnly";
import SubscriptionPage from "./pages/SubscriptionPage";
import SuccessPage from "./pages/SuccessPage";
import PaymentError from "./pages/PaymentError";

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
              <Route path="/*" element={<UnAuthorizedOnly />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<PaymentError />} />
              <Route path="/user/*" element={<AuthorizedOnly />} />
              <Route path="/admin/*" element={<AdminOnly />} />     
              <Route path="/subscription" element={<SubscriptionPage   />} />      
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
