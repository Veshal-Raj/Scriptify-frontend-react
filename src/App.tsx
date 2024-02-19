import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/signup/Signup";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
