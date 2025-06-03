import React, { useContext, useEffect, useRef, useState } from 'react'
import uberLogo from '../assets/uberLogo.png'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'
import axios from 'axios'

const UserLogin = () => {
  const [sendOTP,setSendOTP]=useState(false)
  const {user,setUser}=useContext(UserDataContext)
  const [mobileNo,setMobileNo]=useState('')
  const otpRef=useRef(null)
  const mobileRef=useRef(null)
  const navigate=useNavigate()
  
  const ValidityState=async(token)=>{
    console.log(token)
    try {
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(response.status===200)
      {
        setUser(response.data.user)
        navigate('/home')
      }
    } catch (error) {
      console.log(error)
      // localStorage.removeItem('token')
      navigate('/login')
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
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,{mobile})
    console.log(response)
    if(response.status===200)
    {
      setMobileNo(mobile)
      setSendOTP(true)
    }
  }
  const submitOtp=async(e)=>{
    e.preventDefault()
    console.log("clicked")
    const otp=otpRef.current.value
    console.log(otp,mobileNo)
    try {
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login-otp`,{otp,mobile:mobileNo})
      console.log(response)
      if(response.status==200)
      {
        const data=response.data
        localStorage.setItem('token',data.token)
        setUser(data.user)
        navigate('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='login-container' style={{padding:'14px'}}>
      { sendOTP ?(
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
      ) :(
        <>
          <div className="">
            <img className='login-logo' src={uberLogo} alt="" style={{marginBottom:'1rem !important'}}/>
            <form className='login-form' style={{marginTop:'30px'}} onSubmit={(e)=>submit(e)}>
              <h3 className=''>Enter mobile number</h3>
              <input className='login-input' type="text" required ref={mobileRef}/>
              <button type='submit' className='login-buttom'>Login</button>
            </form>
            <p style={{textAlign:'center'}}>New Here? <Link to='/signup' className='account' 
            style={{color:'#2563eb'}}>Create New Account</Link></p>
          </div>
          <div className="">
              <Link to='/captain-login' className='login-button-captain'>Sign in as Captain</Link>
          </div>
        </>)
        }
    </div>
  )
}

export default UserLogin