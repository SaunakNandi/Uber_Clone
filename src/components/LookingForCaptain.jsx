import React, { useContext } from 'react'
import { VehicleImgContext } from '../context/VehicleContext'

const LookingForCaptain = ({createRide,setvehiclePanelOpen,fare,pickup,destination,vehicleType}) => {
  const [vehicleImg]=useContext(VehicleImgContext)
  return (
    <div>
        <h5 className='vehicle-panel-down'
        onClick={()=>{
          setvehiclePanelOpen(false)
        }}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className='choose-vehicle'>Looking for Captain</h3>
          <div className="confirm-img">
            <img src={vehicleImg} />
            <div className="before-ride-info">
                <div className="ride-info-row">
                    <i className="ri-map-pin-2-fill" style={{fontSize:'16px'}}></i>
                    <div className='address'>
                        <h3>From</h3>
                        <p>{pickup}</p>
                    </div>
                </div>
                <div className="ride-info-row">
                    <i className="ri-square-fill" style={{ fontSize: '16px' }}></i>
                    <div className='address'>
                        <h3>Destination</h3>
                        <p>{destination}</p>
                    </div>
                </div>
                <div className="ride-info-row">
                    <i className="ri-currency-line" style={{ fontSize: '16px' }}></i>
                    <div className='address'>
                        <h3>{fare[vehicleType]}</h3>
                        <p>Cash</p>
                    </div>
                </div>
            </div>
          </div>
    </div>
  )
}

export default LookingForCaptain