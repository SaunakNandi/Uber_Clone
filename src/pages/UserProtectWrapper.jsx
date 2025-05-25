import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'

const UserProtectWrapper = ({children}) => {
    const token=localStorage.getItem('token')
    const {user,setUser}=useContext(UserDataContext)
    const [isLoading,setIsLoading]=useState(true)

    console.log('UserProtectWrapper')
    const navigate=useNavigate()

    async function profile() {
      if (!token)
        navigate('/login')
      try {
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        const data=response.data
        console.log(data)
        if(response.status===200)
        {
          // console.log(data)
          setUser(data)
          setIsLoading(false)
          navigate('/home')
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        setIsLoading(false)
        navigate('/login')
      }
    }

    useEffect(()=>{
      if(!token)
        navigate('/login')
      profile()
    },[token])

  return !isLoading? (
    <>{children}</>
  ):<></>
}

export default UserProtectWrapper