import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SingleBlog from './pages/SingleBlog';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UploadBlog from './pages/UploadBlog';

const App = () => {
  let isLoggedIn=localStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn?<Home /> : <Navigate to={"/signin"}/>}/>
        <Route path='/*' element={<NoPage/>}/>
        <Route path="/blog/:blogId" element={isLoggedIn?<SingleBlog/> : <Navigate to={"/signin"}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/uploadBlog' element={isLoggedIn?<UploadBlog/> : <Navigate to={"/signin"}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App