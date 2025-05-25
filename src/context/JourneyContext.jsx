import { createContext,useState } from "react";

export const JourneyContext=createContext()
export const JourneyContextProvider=({children})=>{
    const [coordinates, setCoordinates] = useState(null)
    const updateCoordinates = (coordinatesData) => {
        setCoordinates(coordinatesData);
    };
    return(
        <JourneyContext.Provider value={{coordinates, updateCoordinates}}>
            {children}
        </JourneyContext.Provider>
    )
}