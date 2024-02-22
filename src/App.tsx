import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/signup/Signup";
import LandingPage from "./pages/LandingPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import appStore from "./redux/appStore";


const queryClient = new QueryClient()

function App() {

  return (
    <>
      <Provider store={appStore}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
