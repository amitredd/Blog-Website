import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Home from './Screens/Home'
import Navbar from './Components/Navbar'
import AddBlog from './Screens/AddBlog'
import SingleBlog from './Screens/SingleBlog'
import PrivateRoute from './Services/ProtectedRoute'

export default function App() {
  return (
    <>
       <Navbar></Navbar>
       <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
           {/* Protected Route */}
 
          <Route path="/" element={<PrivateRoute/>}>

            <Route path="/" element={<Home/>}></Route>
            <Route path="/add-blog" element={<AddBlog/>}></Route>
            <Route path="/blog/:id" element={<SingleBlog/>}></Route>

            
          </Route>
          
       </Routes>
    
    </>
  )
}
