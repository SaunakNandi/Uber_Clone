import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import '../Style.css'
import RideCard from '../components/RideCard'
import {  Navigation, Bike } from 'lucide-react';
import { UserRideDataContext } from '../context/userRideHistoryContext'
import { useParams } from 'react-router-dom';
const RideHistory = () => {
const {role}=useParams()
    const [page,setPage]=useState(1)
    const {userRideHistory}=useContext(UserRideDataContext)
    const [data,setData]=useState(userRideHistory.data ??[])
    const [loading,setLoading]=useState(false)
    const [hasMore,setHasMore]=useState(userRideHistory.hasMore)
    async function fetchData() {
        // console.log("fetchData fetched user ",user)
         try {
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/${role}/${role}-ride-history?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const response=res.data
            console.log("reponse data",response)
            if(response.rideData)
            {
                setData(prev=>[...prev,...response.rideData])
                setHasMore(response.data.hasMore)

            }
        } catch (error) {
            console.log("Error in RideHistory ",error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        setLoading(true)
       fetchData()
    },[page])


    return (
    <div className="ride-history-page">
      <h1 className="ride-history-title">
        <Navigation size={24} />
        Your Ride History
      </h1>

      {loading ? (
        <div className="ride-skeleton-container">
          {[1, 2, 3].map((n) => (
            <div key={n} className="ride-skeleton-card"></div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="ride-empty-state">
          <Bike size={64} />
          <h3 className="empty-title">No rides found</h3>
          <p className="empty-subtitle">Looks like you haven&apos;t taken any trips yet.</p>
        </div>
      ) : (
        <div className="ride-list-container">
          {data.map((ride) => {
            console.log("ride value is ",ride," => ",role,ride[role])
            let requiredRole=role==="captain"?"user":"captain"
            let fullname=ride[requiredRole].fullname.firstname+" "+ride[requiredRole].fullname.lastname
          return  <RideCard key={ride._id} ride={ride} fullname={fullname}/>
})}
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="ride-pagination-container">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`pagination-btn ${page === 1 ? 'disabled' : 'active'}`}
          >
            Previous
          </button>
          
          <span className="pagination-text">
            Page {page}
          </span>
          
          <button 
            onClick={() => setPage(p => p + 1)}
            disabled={!hasMore}
            className={`pagination-btn ${!hasMore ? 'disabled' : 'active'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
  
}

export default RideHistory