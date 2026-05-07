import React, { useContext, useEffect } from 'react'
import '../App.css'
import  '../Style.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { LiveTracking } from '../components/LiveTracking'
import { JourneyContext } from '../context/JourneyContext'
const Riding = () => {
  const location=useLocation()
  const navigate=useNavigate()
  const ride=location.state?.ride
  if(ride===null || ride===undefined) navigate(-1)
  console.log(ride)
  const {socket}=useContext(SocketContext)
  const {coordinates}=useContext(JourneyContext)
  console.log(coordinates)
  socket.on('ride-ended',()=>{
    navigate('/home')
  })
  return ride && (
    <div className='riding'>
        <Link to='/home' className="home-icon">
            <i className="ri-home-8-line"></i>
        </Link>
        <div className="riding-panel1">
            <LiveTracking showRoute={true} rideId={ride._id}/>
        </div>
        <div className="riding-panel2">
         <div className="captain-details">
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714472148/assets/95/a05538-918b-42d8-afe7-3c92325f2fd4/original/UberLux.png" />
            <div style={{textAlign:'right'}}>
              <h2>{ride.captain.fullname.firstname}</h2>
              <h4>{ride.captain.vehicle.plate}</h4>
              <p>Maruti Suzuki Swift</p>
              <h1>{ride?.otp} </h1>
            </div>
          </div>
          <div className="confirm-img">
            <div className="before-ride-info">
                <div className="ride-info-row">
                    <i className="ri-square-fill" style={{ fontSize: '16px' }}></i>
                    <div className='address'>
                        <h3>{ride.pickup}</h3>
                    </div>
                </div>
                <div className="ride-info-row">
                    <i className="ri-map-pin-fill" style={{ fontSize: '16px' }}></i>
                    <div className='address'>
                        <h3>{ride.destination}</h3>
                    </div>
                </div>
                <div className="ride-info-row">
                    <i className="ri-currency-line" style={{ fontSize: '16px' }}></i>
                    <div className='address'>
                        <h3>{ride.fare}</h3>
                        <p>Cash</p>
                    </div>
                </div>
            </div>
          </div>
            <button className='confirm-button'>Make a payment</button>
        </div>
    </div>
  )
}

export default Riding