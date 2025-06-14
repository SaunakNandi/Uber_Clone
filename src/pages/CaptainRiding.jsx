import {useState,useRef,useContext,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../Style.css'
import FinishRide from '../components/FinishRide'
import {useGSAP} from '@gsap/react' 
import gsap from 'gsap'
import { LiveTracking } from '../components/LiveTracking'
import { JourneyContext } from '../context/JourneyContext'
import { SocketContext } from '../context/SocketContext'
const CaptainRiding = () => {
    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location=useLocation()  // useLocation to extract data which are passed inside navigate() from ConfirmRidePopup.jsx
    const navigate=useNavigate()
    const rideData=location.state?.ride
    const {socket}=useContext(SocketContext)
    if(rideData===null || rideData===undefined) navigate(-1)
    const {coordinates}=useContext(JourneyContext)
    console.log(coordinates)
    useGSAP(function(){
        if(finishRidePanel)
        {
          gsap.to(finishRidePanelRef.current,{
            transform:'translateY(0)'
          })
        }
        else
        {
          gsap.to(finishRidePanelRef.current,{
            transform:'translateY(100%)'
          })
        }
      },[finishRidePanel])
      useEffect(()=>{
              socket.emit('join-ride', rideData._id);
              const intervalId=setInterval(() => {
                  navigator.geolocation.getCurrentPosition((position)=>{
                      const {latitude,longitude}=position.coords
                      console.log("position captain ",latitude,longitude)
                      socket.emit('captain-location',{
                          rideId:rideData._id,
                          lat:latitude,
                          lng:longitude
                      })
                  })
              }, 5000);
              return ()=>{
                  clearInterval(intervalId);
                  socket.disconnect();
              }
          },[])
  return (
    <div className='captain-riding'>
        <div className='image-box'>
            <img style={{width:'48px'}}
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
        </div>

        <div className='ride-panel'
          onClick={() => {
              setFinishRidePanel(true)
          }}>
          <h5><i className="ri-arrow-up-wide-line" style={{fontSize:'32px',color:'darkslategray'}}></i></h5>
          {/* <h4 style={{fontSize:'24px',fontWeight:'600'}}>4 KM away</h4> */}
          <button>Complete Ride</button>
        </div>
        <div ref={finishRidePanelRef} className='finishRide'>
            <FinishRide setFinishRidePanel={setFinishRidePanel} rideData={rideData}/>
        </div>

        <div className='livetracker'>
            <LiveTracking showRoute={true}/>
        </div>

    </div>

  )
}

export default CaptainRiding