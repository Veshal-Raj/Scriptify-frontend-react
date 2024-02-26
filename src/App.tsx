import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from "./pages/Login"
import Signup from "./pages/signup/Signup";
import LandingPage from "./pages/LandingPage";
import { Feed } from "./components/Feed";
import Dashboard from "./components/Dashboard";
import AuthorizedOnly from "./routes/AuthorizedOnly";
import UnAuthorizedOnly from "./routes/UnAuthorizedOnly";
import AdminOnly from "./routes/AdminOnly";

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>

              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />

              <Route path="/user/*" element={<AuthorizedOnly />} />
              <Route path="/admin/*" element={<AdminOnly />} />
            

           
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
