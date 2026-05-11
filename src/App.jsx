import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import Start from './pages/Start'
import UserLogout from './pages/UserLogout'

import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import UserProfile from './pages/UserProfile'
import { useEffect, useState } from 'react'
import RideHistory from './pages/RideHistory'
import OtpVerification from './pages/OtpVerification'
import CaptainOTPVerification from './pages/CaptainOTPVerification'
import CaptainProfile from './pages/CaptainProfile'
function App() {
  
  const [windowInnerWidth,setWindowInnerWidth]=useState(window.innerWidth<=768)
  useEffect(()=>{
    function resizeHandler()
    {
      setWindowInnerWidth(window.innerWidth<=768)
    }
    window.addEventListener('resize',resizeHandler)
    return ()=>window.removeEventListener('resize',resizeHandler)
  },[])
  if(!windowInnerWidth)
  {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>This application is only available on mobile browser.</h2>
      </div>
    )
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
          }/>
        <Route path='/login' element={
            <UserLogin/>
        }/>
        <Route path='/ride-history/:role' element={<RideHistory/>}/>
        <Route path='/signup' element={
            <UserSignup/>
          }/>
        <Route path='/ride' element={
          <UserProtectWrapper>
            <Riding/>
          </UserProtectWrapper>
        }/>
        <Route path='/otp' element={
            <OtpVerification/>
        }/>
        <Route path='/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }/>
        <Route path='/captain-login' element={
            <CaptainLogin/>
          }/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
        }/>
        <Route path='/captain-riding' element={
          <CaptainProtectWrapper>
            <CaptainRiding/>
          </CaptainProtectWrapper>
          }
          />
          <Route path='/captain-otp' element={
              <CaptainOTPVerification/>
          }/>
        <Route path='/user-profile' element={<UserProtectWrapper>
            <UserProfile/>
          </UserProtectWrapper>}/>
        <Route path='/captain-profile' element={
          <CaptainProtectWrapper>
            <CaptainProfile/>
          </CaptainProtectWrapper>
        }/>
      </Routes>
    </>
  )
}

export default App
