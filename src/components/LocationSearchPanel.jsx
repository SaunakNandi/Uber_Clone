import React from 'react'
import  '../Style.css'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = ({suggestions,setPickup, setDestination, activeField}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
        setPickup(suggestion)
    } else if (activeField === 'destination') {
        setDestination(suggestion)
    }
  }
  // console.log(suggestions)
  return suggestions && (
    <div>
      {
        suggestions.map((dest,i)=>{
          return (
            <div className="location-suggestion-box" key={i}
              onClick={() => {
                handleSuggestionClick(dest.description)
              }}>
              <h2 className='location-icons'><i className="ri-map-pin-fill"></i></h2>
              <h4>{dest.description}</h4>
            </div>
          )
        })
      }
    </div>
  )
}

export default LocationSearchPanel