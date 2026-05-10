import {useState,useRef} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import './component.css'
import { Link } from 'react-router-dom'

const HamburgerMenu = ({captain=false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useGSAP(function(){
    if(!isOpen)
    {
        gsap.to(menuRef.current, {
          x:"-100%",
          duration: 0.5,
          ease: "power3.in",
        });
    }
    else
    {
        gsap.to(menuRef.current,{
            x:"90%",
            duration: 0.5,
            ease: "power3.out",
        })  
    }
  },[isOpen])
  return (
    <>
      {/* Hamburger Icon */}
      <div className={`hamburger-icon ${isOpen ? "open" : ""}`} onClick={()=>setIsOpen(prev=>!prev)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu */}
      <div className="menu" ref={menuRef}>
        <ul>
          <li><Link to={captain? `/captain-profile`:`/user-profile`}>Profile</Link></li>
          <li><Link to={captain? `/ride-history/captains`:`/ride-history/user`}>Ride History</Link></li>
          
          <li>Update Profile</li>
          <li>Settings</li>
          <li><Link to='/logout'>Logout</Link></li>
        </ul>
      </div>
    </>
  )
}

export default HamburgerMenu