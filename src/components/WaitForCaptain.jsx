import React, { useContext } from 'react'
import '../Style.css'
import { VehicleContext, VehicleImgContext } from '../context/VehicleContext'

const WaitForCaptain = ({setWaitingForDriver,ride,setVehicleFound,fare}) => {
  if(ride===null) return
  const [vehicleImg]=useContext(VehicleImgContext)
  console.log(ride)
  console.log(fare)
  return (
    <div>
          <h5 className='vehicle-panel-down'
          onClick={()=>{
            setWaitingForDriver(true)
          }}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <div className="captain-details">
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714472148/assets/95/a05538-918b-42d8-afe7-3c92325f2fd4/original/UberLux.png" />
            <div style={{textAlign:'right'}}>
              <h2>{ride.captain.fullname.firstname}</h2>
              <h4>{ride.captain.vehicle.plate}</h4>
              <p>Maruti Suzuki Swift</p>
              <h1>OTP- {ride.otp}</h1>
            </div>
          </div>
          <div className="confirm-img">
            <div className="before-ride-info">
                <div className="ride-info-row">
                    <i className="ri-map-pin-2-fill" style={{fontSize:'16px'}}></i>
                    <div className='address'>
                        <h3>{ride.pickup}</h3>
                        <p></p>
                    </div>
                </div>
                <div className="ride-info-row">
                    <i className="ri-square-fill" style={{ fontSize: '16px' }}></i>
                    <div className='address'>
                        <h3>{ride.destination}</h3>
                        <p></p>
                    </div>
                </div>
                <div className="ride-info-row">
                    <i className="ri-currency-line" style={{ fontSize: '16px' }}></i>
                    <div className='address'>
                        <h3>₹ {ride.fare}</h3>
                        <p>Cash</p>
                    </div>
                </div>
            </div>
          </div>
    </div>
  )
}

export default WaitForCaptain