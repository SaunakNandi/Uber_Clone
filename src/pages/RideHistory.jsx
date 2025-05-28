import axios from 'axios'
import { useEffect, useState } from 'react'
import '../Style.css'
const RideHistory = () => {

    const [page,setPage]=useState(1)
    const [data,setData]=useState([])
    const [hasMore,setHasMore]=useState(true)
    async function fetchData() {
         try {
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/ride-history?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data)
            {
                setData(prev=>[...prev,response.data.data])
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
                            {console.log(item)}
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