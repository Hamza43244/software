import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Screens/Dashboard'
import RedistrationForm from '../Screens/Institutescreens/Registrationform'
import Login from '../Screens/Login'
import SignUp from '../Screens/Signup'
import PtrotectedRoute from './Protectedroutes'

const Approuter = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path ="/" element={<SignUp/>}/> */}
      <Route path ="/" element={<Login/>}/>
      <Route path ="form" element={<RedistrationForm/>}/>
      <Route path ="Signup" element={<SignUp/>}/>
      <Route path ="Login" element={<Login/>}/>
      <Route path ="Dashboard/*" element={< PtrotectedRoute  Component ={Dashboard}/>}/>
      <Route path ="Dashboard/*" element={<Dashboard/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default Approuter