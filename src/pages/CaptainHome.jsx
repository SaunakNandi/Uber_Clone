import React,{ useState,useContext,useRef,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import '../App.css'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import {useGSAP} from '@gsap/react' 
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ComfirmRidePopup'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'
import HamburgerMenu from '../components/HamburgerMenu'

const CaptainHome = () => {
    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const [panelOpen,setPanelOpen]=useState(false)
    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)
    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)
    const panelClose=useRef(null)
    useEffect(() => {
// may cause location error
      if(captain)
      {
        socket.emit('join',{
        userId:captain._id,
        userType:'captain'
        })
        const updateLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // console.log({
                //   userId: captain._id,
                //   location: {
                //       ltd: position.coords.latitude,
                //       lng: position.coords.longitude
                //   }
                // })

                socket.emit('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
              })
          }
        }

        setInterval(updateLocation, 10000)
        updateLocation()
      }
    }, [])
    
    socket.on('new-ride',(data)=>{
      console.log(data)
      setRide(data)
      setRidePopupPanel(true)
    })

    async function confirmRide()
    {
      const token=localStorage.getItem('token')
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
        rideId:ride._id,
        captainId:captain._id,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    }
    useGSAP(function(){
        if(ridePopupPanel)
        {
          gsap.to(ridePopupPanelRef.current,{
            transform:'translateY(0)'
          })
        }
        else
        {
          gsap.to(ridePopupPanelRef.current,{
            transform:'translateY(100%)'
          })
        }
      },[ridePopupPanel])

      useGSAP(function(){
        if(confirmRidePopupPanel)
        {
          gsap.to(confirmRidePopupPanelRef.current,{
            transform:'translateY(0)'
          })
        }
        else
        {
          gsap.to(confirmRidePopupPanelRef.current,{
            transform:'translateY(100%)'
          })
        }
      },[confirmRidePopupPanel])
  return (
    <div className='captain-homescreen'>
       <div style={{position: 'relative'}}>
            <HamburgerMenu captain={true}/>
          </div>
      <div className='first-view'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      </div>
    
      
      <div style={{height:'70%'}}>
          <img className='captain-map' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div style={{height:'30%', padding:'24px'}}>
          <CaptainDetails/>
      </div>
      <div ref={ridePopupPanelRef} className='rider-popup'>
          <RidePopup
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
              ride={ride}
              confirmRide={confirmRide}
              />
      </div>
      <div ref={confirmRidePopupPanelRef} className='confirmed-rider-popup'>
              <ConfirmRidePopup
              ride={ride}
              setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
              setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome