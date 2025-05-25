import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'

const CaptainProtectWrapper = ({children}) => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const {captain,setCaptain}=useContext(CaptainDataContext)
    const [isLoading,setIsLoading]=useState(true)
    
    async function checkCaptainValidity() {
      console.log('welcome')
      if (!token)
        navigate('/captain-login')
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          setCaptain(response.data.captain)
          setIsLoading(false)
          navigate('/captain-home')
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        // localStorage.removeItem('token')
        navigate('/captain-login')
      }
    }
    useEffect(()=>{
      checkCaptainValidity()
    },[token])
    

  return !isLoading ? (
    <>{children}</>
  ):<div>X</div>
}

export default CaptainProtectWrapper