import React, { useContext } from 'react'
import '../Style.css'
import { VehicleImgContext } from '../context/VehicleContext'
export const VehiclePanel = ({setvehiclePanelOpen,setConfirmedRidePanel,fare,selectVehicle}) => {
  const [vehicleImg,setVehicleImg]=useContext(VehicleImgContext)
  return (
    <>
      <h5 className='vehicle-panel-down'
          onClick={()=> setvehiclePanelOpen(false)}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className='choose-vehicle'>Choose a vehicle for travel</h3>
          <div className="mode"
          onClick={()=>{
            setConfirmedRidePanel(true)
            setVehicleImg('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714472148/assets/95/a05538-918b-42d8-afe7-3c92325f2fd4/original/UberLux.png')
            selectVehicle('car')
          }}>
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714472148/assets/95/a05538-918b-42d8-afe7-3c92325f2fd4/original/UberLux.png" />
            <div className="mode-row">
              <h4>Uber Taxi <span><i className="ri-user-follow-fill"></i>4</span></h4>
              <h5>2 min away</h5>
              <p>Affordable, compact rides</p>
            </div>
            <h2 className='price'>₹{fare.car}</h2>
          </div>
          <div className="mode"
          onClick={()=>{
            setConfirmedRidePanel(true)
            setVehicleImg('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png')
            selectVehicle('auto')
          }}>
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" />
            <div className="mode-row">
              <h4>Uber Auto <span><i className="ri-user-follow-fill"></i>4</span></h4>
              <h5>2 min away</h5>
              <p>Affordable, compact rides</p>
            </div>
            <h2 className='price'>₹{fare.auto}</h2>
          </div>
          <div className="mode"
          onClick={()=>{
            setConfirmedRidePanel(true)
            setVehicleImg('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png')
            selectVehicle('moto')
          }}>
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" />
            <div className="mode-row">
              <h4>Uber Bike <span><i className="ri-user-follow-fill"></i>4</span></h4>
              <h5>2 min away</h5>
              <p>Affordable, compact rides</p>
            </div>
            <h2 className='price'>₹{fare.moto}</h2>
          </div>
      </>
  )
}
