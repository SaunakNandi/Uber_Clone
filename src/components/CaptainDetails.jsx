import React, { useContext } from 'react'
import  './component.css'
import { CaptainDataContext } from '../context/captainContext'

const CaptainDetails = () => {
    const {captain}=useContext(CaptainDataContext)
  return captain && (
    <div>
        <div className='captain-details-container'>
            <div className='captain-name'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                <h4>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
            </div>
            <div>
                <h4 style={{fontSize:'24px',fontWeight:'700'}}>₹2200</h4>
                <p style={{fontSize:'14px',color:'darkgray'}}>Earned</p>
            </div>
        </div>
        <div className='bottom-box'>
            <div className='about-today'>
                <i className="ri-timer-2-line"></i>
                <h5>10.2</h5>
                <p>Hours Online</p>
            </div>
            <div className='about-today'>
                <i className="ri-speed-up-line"></i>
                <h5>30 KM</h5>
                <p>Driven Today</p>
            </div>
            <div className='about-today'>
                <i className="ri-booklet-line"></i>
                <h5>3 people</h5>
                <p>chose you</p>
            </div>

        </div>
    </div>
  )
}

export default CaptainDetails