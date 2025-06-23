import { useState } from 'react'
import { Routes, Route  } from 'react-router-dom'
import { Login } from './pages/Login.jsx'
import { Home } from './pages/Home.jsx'
import { EmailVerify } from './pages/EmailVerify.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'
import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/email-verify' element={<EmailVerify />}/>
      <Route path='/reset-password' element={<ResetPassword />}/>
    </Routes>
    </>
  )
}

export default App
