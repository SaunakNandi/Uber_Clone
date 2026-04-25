import React, { useRef, useState, useCallback, useContext, useEffect } from 'react'
import  '../Style.css'
import {useGSAP} from '@gsap/react' 
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import { VehiclePanel } from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForCaptain from '../components/LookingForCaptain'
import WaitForCaptain from '../components/WaitForCaptain'
import axios from 'axios'
import debounce from "lodash.debounce";
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { LiveTracking } from '../components/LiveTracking'
import { JourneyContext } from '../context/JourneyContext'
import HamburgerMenu from '../components/HamburgerMenu'


const Home = () => {
  const [pickup,setPickup]=useState('')
  const [destination,setDestination]=useState('')
  const [panelOpen,setPanelOpen]=useState(false)
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)
  const [vehiclePanelOpen,setvehiclePanelOpen]=useState(false)
  const [confirmedRidePanel,setConfirmedRidePanel]=useState(false)
  const [vehicleFound,setVehicleFound]=useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)
  const panelRef=useRef(null)
  const panelClose=useRef(null)
  const vehiclePanelOpenRef=useRef(null)
  const confirmedRideRef=useRef(null)
  const vehicleFoundRef=useRef(null)
  const waitingForCaptainRef=useRef(null)
  const {socket}=useContext(SocketContext)
  const {user}=useContext(UserDataContext)
  const {coordinates, updateCoordinates}=useContext(JourneyContext)
  const navigate=useNavigate()

  useEffect(()=>{
    // console.log(user)
    if(!user) return
    socket.emit("join",{userType:"user",userId:user?._id})
  },[user])
  
  socket.on('ride-confirmed',ride=>{
    setWaitingForDriver(true)
    setVehicleFound(false)
    setRide(ride)
  })

  socket.on('ride-started',()=>{
    setWaitingForDriver(false)
    navigate('/ride',{state:{ride}})
  })

  const debouncing1 = useCallback(
    debounce(async (searchTerm) => {
      await handlePickupChange(searchTerm);
    }, 500),
    []
  );

  const debouncing2 = useCallback(
    debounce(async (searchTerm) => {
      await handleDestinationChange(searchTerm);
    }, 500),
    []
  );
  const handlePickupChange = async (searchTerm) => {
    if(searchTerm.length<3) return
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: searchTerm },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        console.log("maps  responnse " ,response.data)
        setPickupSuggestions(response.data)
    } catch(error) {
        console.log(error)
    }
}

  const handleDestinationChange = async (searchTerm) => {
    if(searchTerm.length<3) return
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: searchTerm },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        // console.log(response?.data)
        setDestinationSuggestions(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function findTrip() {
    
    setPanelOpen(false)
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setvehiclePanelOpen(true)
    setPanelOpen(false)
    // console.log(response.data)
    setFare(response.data)
  }

  async function createRide()
  { 
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
         pickup, destination, vehicleType 
        },{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      // console.log(response.data)
    const locationData=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/location`,{
        params:{
            rideId:response.data._id,
            pickup:response.data.pickup,
            destination:response.data.destination
        }
    })
    console.log(locationData.data)
    updateCoordinates(locationData.data)
    } catch (error) {
      console.log(error)
    }
  }
  const submit=(e)=>{
    e.preventDefault()
  }

  // GSAP
  useGSAP(function(){
    if(panelOpen)
    {
      gsap.to(panelRef.current,{
        height:'80%',
        display:'initial',
        padding:20
      })
      gsap.to(panelClose.current,{
        opacity:1
      })
    }
    else
    {
      gsap.to(panelRef.current,{
        height:'0',
        display:'none',
        padding:0
      })
      gsap.to(panelClose.current,{
        opacity:0
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanelOpen)
    {
      gsap.to(vehiclePanelOpenRef.current,{
        transform:'translateY(0)'
      })
    }
    else
    {
      gsap.to(vehiclePanelOpenRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehiclePanelOpen])
  useGSAP(function(){
    if(confirmedRidePanel)
    {
      gsap.to(confirmedRideRef.current,{
        transform:'translateY(0)'
      })
    }
    else
    {
      gsap.to(confirmedRideRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[confirmedRidePanel])

  useGSAP(function(){
    if(vehicleFound)
    {
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(0)'
      })
    }
    else
    {
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(110%)'
      })
    }
  },[vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
        gsap.to(waitingForCaptainRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(waitingForCaptainRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ waitingForDriver ])
  

// home-logo2 incomplete
  return (
    <div className='home-screen'>
      <div className='livetracker'>
        <LiveTracking showRoute={true} setPickup={setPickup} panelOpen={panelOpen}/>
      </div>
      <div className="home-trip">
        <div className="trip-smallbox">
          <h5 ref={panelClose} onClick={()=>{
            setPanelOpen(false)
          }}><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='trip-heading'>Find a trip</h4>
          <form style={{ maxWidth: 'fit-content' }}
          onSubmit={(e) => {
            submit(e)
          }}>
            <div className="liner"></div>
            <input value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
                debouncing1(e.target.value)
              }}
              type="text" placeholder='Add a pick up location' className='trip-form-input'
              style={{ marginTop: '20px' }}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }} />
            <input value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                debouncing2(e.target.value)
              }}
              type="text" placeholder='Add your destination' className='trip-form-input'
              style={{ marginTop: '20px' }}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }} />
          </form>
          <button
            onClick={findTrip}
            className='find-trip-button'>
            Find Trip
          </button>
        </div>
        <div className="trip-largebox" ref={panelRef}>
            <LocationSearchPanel 
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
        </div>
      </div>
      <div className="ride-mode" ref={vehiclePanelOpenRef}>
        <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setvehiclePanelOpen={setvehiclePanelOpen}
        selectVehicle={setVehicleType}
        fare={fare}/>
      </div>
      <div className="ride-mode" ref={confirmedRideRef}>
        <ConfirmedRide setvehiclePanelOpen={setvehiclePanelOpen} setConfirmedRidePanel={setConfirmedRidePanel}
        createRide={createRide}
        setVehicleFound={setVehicleFound}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        fare={fare}/>
      </div>
      <div className="ride-mode" ref={vehicleFoundRef}>
        <LookingForCaptain setvehiclePanelOpen={setvehiclePanelOpen} fare={fare}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}/>
      </div>
      <div className="ride-mode" ref={waitingForCaptainRef}>
        <WaitForCaptain setWaitingForDriver={setWaitingForDriver}
        ride={ride}/>
      </div>
    </div>
  )
}

export default Home