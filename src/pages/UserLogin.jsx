import React, { useContext, useEffect, useState } from 'react'
import uberLogo from '../assets/uberLogo.png'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'
import axios from 'axios'

const UserLogin = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {user,setUser}=useContext(UserDataContext)
  const navigate=useNavigate()
  
  const ValidityState=async(token)=>{
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
      localStorage.removeItem('token')
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

    const userData={
      email,
      password
    }
    
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
    console.log(response)
    if(response.status===200)
    {
      const data=response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='login-container' style={{padding:'14px',marginRight:'30px'}}>
      <div className="">
        <img className='login-logo' src={uberLogo} alt="" />
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
          <p style={{textAlign:'center'}}>New Here? <Link to='/signup' className='account' 
          style={{color:'#2563eb'}}>Create New Account</Link></p>
      </div>
      <div className="">
          <Link to='/captain-login' className='login-button-captain'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin