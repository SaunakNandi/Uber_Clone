import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Link, useNavigate} from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'

const CaptainLogin = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const {captain,setCaptain}=useContext(CaptainDataContext)

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
      localStorage.removeItem('token')
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
    console.log("clicked")
    const captainData={
      email,
      password
    }
    // console.log(captainData)
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData)
    // console.log(response)
    if(response.status===200)
    {
      const data=response.data
      localStorage.setItem('token',data.token)
      setCaptain(data.captain)
      // console.log("I am calling")
      navigate('/captain-home')
    } 
    setEmail('')
    setPassword('')
  }
  return (
    <div className='login-container' style={{padding:'14px',marginRight:'30px'}}>
      <div className="">
      <img className='login-logo' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" 
      style={{marginBottom:'1rem !important'}}/>
      <form className='login-form' style={{marginTop:'30px'}} onSubmit={(e)=>submit(e)}>
        <h3 className='heading'>What's your email</h3>
        <input className='login-input'
        type="email" required placeholder='email@example.com'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>
        <h3 className='login-password'>Enter Password</h3>
        <input className='login-input' type="password" required placeholder='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
        <button className='login-buttom'>Login</button>
      </form>
        <p style={{textAlign:'center'}}>Want to be a Captain? <Link to='/captain-signup' className='account'>Register as</Link></p>
      </div>
      <div className="">
        <Link to='/login' className='login-button-user'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin