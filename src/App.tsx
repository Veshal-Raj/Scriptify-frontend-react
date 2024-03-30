import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthorizedOnly from "./routes/AuthorizedOnly";
import AdminOnly from "./routes/AdminOnly";
import UnAuthorizedOnly from "./routes/UnAuthorizedOnly";

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
              <Route path="/*" element={<UnAuthorizedOnly />} />
              <Route path="/user/*" element={<AuthorizedOnly />} />
              <Route path="/admin/*" element={<AdminOnly />} />           
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
