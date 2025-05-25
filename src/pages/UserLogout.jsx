import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
      
    const token=localStorage.getItem('token')
    // console.log(token)
    const navigate=useNavigate()
    axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`,{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>{
        if(res.status===200)
        {
            console.log("Hello")
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
  return (
    <div>UserLogout</div>
  )
}
export default UserLogout