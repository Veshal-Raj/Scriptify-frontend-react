import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup";



function App() {
  

  return (
   <>
        {/* <Route path="/" element={<Login />} /> */}
      <BrowserRouter>
    <Routes>

        <Route path="/sign-in" element={<Login />} />
  
        <Route path="/sign-up" element={<Signup />} />
        
    </Routes>
        
    </BrowserRouter>
      
    </>
  )
}

export default App
