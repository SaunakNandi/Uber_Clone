import axios from 'axios'
import { useEffect, useState } from 'react'
import '../Style.css'
import { UserContext, UserDataContext } from '../context/userContext'
const RideHistory = () => {

    const [page,setPage]=useState(1)
    const [data,setData]=useState([])
    const {user}=UserContext(UserDataContext)
    const [hasMore,setHasMore]=useState(true)
    async function fetchData() {
        console.log("fetchData fetched user ",user)
         try {
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/user-ride-history?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const response=res.data
            console.log("reponse data",response.rideData)
            if(response.data)
            {
                setData(prev=>[...prev,response.rideData])
                setHasMore(response.data.hasMore)
                console.log(response.data)
            }
        } catch (error) {
            
            console.log("Error in RideHistory ",error)
        }
    }
    useEffect(()=>{
       fetchData()
    },[page])

    useEffect(()=>{
        const rideContainer=document.querySelector('.ride-container:last-child')
        if(!rideContainer || !hasMore) return;
        const observer=new IntersectionObserver((param)=>{
            if(param[0].isIntersecting)
            {
                // observer.unobserve(rideContainer)
                setPage(prev=>prev+1)
            }
        })
        observer.observe(rideContainer)
        return ()=>{
            if(rideContainer)
                observer.unobserve(rideContainer)
            observer.disconnect()
        }
    },[data])
  return (
    <div className="ride-hisotry-main">
        <p className='ride-history-title'>Your Previous Rides</p>
        <>
            {
                data && (
                    data.map((item,index)=>(
                        <>
                            {
                                item.captain && (
                                    <div className="rides">
                                        <div className="ride-container" key={index}>
                                            <p><span style={{fontWeight:600}}>Captain</span> - {item?.captain?.fullname?.firstname} {item?.captain?.fullname?.lastname}
                                            </p>
                                            <p><span style={{fontWeight:600}}>From</span> - {item.pickup}</p>
                                            <p><span style={{fontWeight:600}}>To</span> - {item.destination}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    ))
                )
            }
        </>
    </div>
  )
}

export default RideHistory