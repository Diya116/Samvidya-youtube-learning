import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard  from "./pages/Dashboard/Dashboard";
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
// import { Suspense,lazy } from 'react'
// import { useState } from 'react'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/workspace" element={<Dashboard/>}/>
    <Route  path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/profile" element={<Profile/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
