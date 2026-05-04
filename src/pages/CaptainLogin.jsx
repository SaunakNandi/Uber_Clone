import React, { useContext, useEffect, useState,useRef } from 'react'
import '../App.css'
import { Link, useNavigate} from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'
import uberLogo from '../assets/uberLogo.png'
const CaptainLogin = () => {
  const [mobileNo,setMobileNo]=useState('')
  const [sendOTP,setSendOTP]=useState(false)
  const otpRef=useRef(null)
  const mobileRef=useRef(null)
  const navigate=useNavigate()
  const {setCaptain}=useContext(CaptainDataContext)

  const ValidityState=async(token)=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(response.status===200)
      {
        setCaptain(response.data.captain)
        navigate('/captain-home')
      }
    } catch (error) {
      console.log(error)
      // localStorage.removeItem('token')
      navigate('/captain-login')
    }
  }

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token)
      ValidityState(token)
  },[])

  const submit=async(e)=>{
    e.preventDefault()
    const mobile=mobileRef.current.value
    console.log(mobile)
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,{mobile})
    console.log(response)
    if(response.status===200)
    {
      setMobileNo(mobile)
      setSendOTP(true)
    }
  }
  const submitOtp=async(e)=>{
    e.preventDefault()
    // console.log("clicked")
    const otp=otpRef.current.value
    console.log(otp,mobileNo)
    try {
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login-otp`,{otp,mobile:mobileNo})
      if(response.status==200)
      {
        console.log(response)
        const data=response.data
        localStorage.setItem('token',data.token)
        setCaptain(data.captain)
        navigate('/captain-home')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='login-container'>
      {
        sendOTP?(
          <>
            <div className='otp-container'>
              <img className='login-logo' src={uberLogo} alt="" />
              <h3 className='heading'>Enter OTP</h3>
              <input className='login-input' type="text" required ref={otpRef}/>
              <div className="otp-button">
                <button className='login-buttom' type='button' onClick={submitOtp}>Verify OTP</button>
              </div>
            </div>
          </>
        ):(
          <>
            <div className="">
              <img className='login-logo' src={uberLogo} alt="" 
              style={{marginBottom:'1rem !important'}}/>
              <form className='login-form' style={{marginTop:'30px'}} onSubmit={(e)=>submit(e)}>
                <h3 className=''>Enter mobile number</h3>
                <input className='login-input' type="text" required ref={mobileRef}/>
                <button className='login-buttom'>Login</button>
              </form>
              <p style={{textAlign:'center'}}>Don't have an account? <Link to='/captain-signup' className='account'>Register as</Link></p>
            </div>
            <div className="">
              <Link to='/login' className='login-button-user'>Sign in as User</Link>
            </div>
          </>
        )
      }
    </div>
  )
}

export default CaptainLogin