import { createContext, useState } from 'react'

export const UserRideDataContext=createContext()
export const RiderContext = ({children}) => {

    const [userRideHistory,setUserRideHistory]=useState({
      data:null,
      hasMore:false
    })

  return (
    <div>
        <UserRideDataContext.Provider value={{userRideHistory,setUserRideHistory}}>
            {children}
        </UserRideDataContext.Provider>
    </div>
  )
}

