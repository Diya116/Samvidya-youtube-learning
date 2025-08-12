import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Suspense,lazy } from 'react';
const Home = lazy(() => import('./pages/landingpage/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Learning=lazy(()=>import('./pages/learning/Learning'))
const Signup = lazy(() => import('./pages/auth/signup/Signup'));
const Login = lazy(() => import('./pages/auth/login/Login'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
import NotFound from './pages/notFound/NotFound';
import { ProtectedRoute } from './protectingRoute';
import Loader from "./components/Loader"
import { Toaster } from "sonner";
function App() {
  return (
   <BrowserRouter>
   <Suspense fallback={<Loader/>}>
    <Toaster position="top-right" richColors />
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/workspace" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path='/learn/:id' element={<ProtectedRoute><Learning/></ProtectedRoute>}/>
    <Route  path="/auth/signup" element={<Signup/>}/>
    <Route path="/auth/login" element={<Login/>}/>
    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>
   </Suspense>
   </BrowserRouter>
  )
}

export default App
