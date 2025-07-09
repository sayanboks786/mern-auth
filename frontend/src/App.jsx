// import { useState } from 'react'
import { Routes, Route  } from 'react-router-dom'
import { Login } from './pages/Login.jsx'
import { Home } from './pages/Home.jsx'
import { EmailVerify } from './pages/EmailVerify.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'
import Navbar from './components/Navbar.jsx'
import { Signup } from './pages/Signup.jsx'
import { Box, useColorModeValue } from '@chakra-ui/react'

function App() {

  return (
    <>
    <Box minH={100} bg={useColorModeValue("gray.100", "gray.900")}>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/email-verify' element={<EmailVerify />}/>
      <Route path='/reset-password' element={<ResetPassword />}/>
    </Routes>
    </Box>
    </>
  )
}

export default App
