import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './component.css'
import axios from 'axios'
import { LiveTracking } from './LiveTracking'
import { JourneyContext } from '../context/JourneyContext'
import { SocketContext } from '../context/SocketContext'

const ConfirmRidePopup = ({setConfirmRidePopupPanel,ride,setRidePopupPanel}) => {
    if(ride==null) return null
    console.log("Ride is",ride)
    // const {socket}=useContext(SocketContext)
    const [ otp, setOtp ] = useState('')
    // const [coordinates, setCoordinates] = useState(null)
    const navigate = useNavigate()
    const {updateCoordinates}=useContext(JourneyContext)
    // console.log(coordinates)
    const submit=async()=>{
        // this was a get operation in the video but it should be a post operation
        try {
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
                rideId:ride._id,
                otp:otp
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(response.data)

            // Call the api for the coordinate

            let locationData={}
            if(response)
            {
                locationData=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/location`,{
                    params:{
                        rideId:ride._id,
                        pickup:response.data.pickup,
                        destination:response.data.destination
                    }
                })
            }
            console.log("locationData.data ",locationData.data)
            // setCoordinates(locationData.data)
            updateCoordinates(locationData.data)
            if(response.status===200)
            {
                setConfirmRidePopupPanel(false)
                setRidePopupPanel(false)
                navigate('/captain-riding',{state:{ride}})
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    
    // Live tracker to be implemented here
  return (
    <div className='confirmride-popup-container'>
            <div className='livetracker'>
                <LiveTracking rideId={ride._id}/>
            </div>
            <h3 className='confirm-your-ride'>Confirm this ride to Start</h3>
            <div className='confirmride-captain-details'>
                <div className='image-div '>
                    <img src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{ride?.user.fullname.firstname}</h2>
                </div>
                <h5 style={{fontSize:'18px',fontWeight:'600'}}>{ride?.distance}</h5>
            </div>
            <div className='bottom-dashboard'>
                <div style={{width:'100%',marginTop:'12px'}}>
                    <div className='row1'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3>{ride.pickup}</h3>
                            {/* <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p> */}
                        </div>
                    </div>
                    <div className='row2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3>{ride.destination}</h3>
                            {/* <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p> */}
                        </div>
                    </div>
                    <div className='row3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                        </div>
                    </div>
                </div>

                <div className='decision-panel'>
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <input value={otp} type="text" placeholder='Enter OTP' 
                        onChange={(e)=>setOtp(e.target.value)}/>
                        <div className="decision-buttons">
                            <button className='confirm' onClick={submit}>Confirm</button>
                            <button className='cancel' onClick={() => {
                                setConfirmRidePopupPanel(false)
                                setRidePopupPanel(false)
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ConfirmRidePopup