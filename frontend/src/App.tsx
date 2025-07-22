import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard  from "./pages/Dashboard/Dashboard";
import Signup from './pages/auth/signup/Signup';
import Login from './pages/auth/login/Login';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import { ProtectedRoute } from './protectingRoute';
import { Toaster } from "sonner";
function App() {
  return (
   <BrowserRouter>
    <Toaster position="top-right" richColors />
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/workspace" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route  path="/auth/signup" element={<Signup/>}/>
    <Route path="/auth/login" element={<Login/>}/>
    <Route path="/profile" element={<Profile/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
