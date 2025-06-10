import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext, UserDataContext } from '../context/userContext'
import { useContext } from 'react'

const OtpVerification = () => {
    const mobileRef=useRef(null)
    const otpRef=useRef(null)
    console[otpReceived,setOtpReceived]=useState(false)
    const navigate=useNavigate()
    const location=useLocation()
    const {mobile}=location.state || {}
    const {setUser}=useContext(UserDataContext)
    async function submitOTP()
    {
        const otp=otpRef.current
        try {
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/verify-otp`,{mobile,otp})
            console.log(response)
            if(response.status==200)
            {
                const data=response.data
                setUser(data.user)
                localStorage.setItem('token',data.token)
                navigate('/home')
            }
        } catch (error) {
            console.log("OTP verification",error)
        }
    }
    
  return (
    <div className='otp-container'>
        <p>You have received your otp on {mobileRef.current}</p>
        <input type="text" ref={otpRef}/>
        <button type='button' onClick={submitOTP}>Confirm OTP</button>
    </div>
  )
}

export default OtpVerification