import React from 'react'
import uberLogo from '../assets/uberLogo.png'
import { Link } from 'react-router-dom'
const Start = () => {
  return (
    <div>
        <div className="home-div">
            <img className='img-width' src={uberLogo} alt="" />
            <div className='get-started'>
                <h2>Get Started with Uber</h2>
                <Link to="/login" className='button'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start