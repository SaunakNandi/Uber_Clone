import React, { createContext, useState } from 'react'

export const VehicleImgContext=createContext()
export const VehicleContext = ({children}) => {

    const [vehicleImg,setVehicleImg]=useState('')
  return (
    <div>
        <VehicleImgContext.Provider value={[vehicleImg,setVehicleImg]}>
            {children}
        </VehicleImgContext.Provider>
    </div>
  )
}

