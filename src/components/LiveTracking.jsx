import React,{useState,useEffect, useContext, useRef} from 'react'
import { LoadScript,Marker,GoogleMap,DirectionsRenderer } from '@react-google-maps/api'
import { JourneyContext } from '../context/JourneyContext';
import HamburgerMenu from './HamburgerMenu';
import '../App.css'
import { SocketContext } from '../context/SocketContext';
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523
};
export const LiveTracking = React.memo(({showRoute=false,setPickup=()=>{},panelOpen=false,rideId=''}) => {
  const [ currentPosition, setCurrentPosition ] = useState(center);
  const [ mapCenter, setMapCenter ] = useState(center); // NEW: Dedicated state for map center
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [zoom,setZoom]=useState(11)
  const [mapLoaded,setMapLoaded]=useState(false)
  const [captainPosition,setCaptainPosition]=useState(null)
  const mapRef=useRef(null)
  const {socket}=useContext(SocketContext)
  const {coordinates, updateCoordinates}=useContext(JourneyContext)
  const { pickupCoordinates = null, destinationCoordinates = null } = coordinates || {};


  const calculateRoute = () => {
        const directionsService = new window.google.maps.DirectionsService();
        if(!pickupCoordinates || !destinationCoordinates) return;
        // console.log(window.google.maps.TravelMode.DRIVING)
        directionsService.route(
        {
            origin: pickupCoordinates,
            destination: destinationCoordinates,
            travelMode: window.google.maps.TravelMode.DRIVING, // Change to WALKING, BICYCLING, or TRANSIT as needed
        },
        (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
            } else {
            console.error(`Error fetching directions ${status}`);
            }
        }
        );
    }

    useEffect(()=>{
        if(!window.google || !window.google.maps.marker || !mapRef.current) return
        const { AdvancedMarkerElement }=window.google.maps.marker;

        const currentMarker=new AdvancedMarkerElement({
            map:mapRef.current,
            position:currentPosition,
            title:'current position'
        })

        return ()=>{
            currentMarker.map=null
        }
    },[currentPosition])
    
    function getAddressFromCoords(latitude,longitude)
    {
        if(!window.google || !window.google.maps) return

        console.log("At liveTracking ",typeof longitude,typeof latitude)
        const geoCoder=new window.google.maps.Geocoder()
        const latlng={ lat: latitude, lng: longitude } 
        geoCoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                setPickup(results[0].formatted_address)
                console.log("Address:", results[0].formatted_address);
            } else {
            console.warn("No results found");
            }
        } else {
            console.error("Geocoder failed due to:", status);
        }
        });
    }
useEffect(() => {
      // 1. Get initial position to center the map ONCE
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const initialCoords = { lat: latitude, lng: longitude };
          
          setCurrentPosition(initialCoords);
          setMapCenter(initialCoords); // Set map center only on initial load
          
          if(mapLoaded) {
             getAddressFromCoords(latitude, longitude);
          }
      });

      // 2. Watch position continuously for the marker
      const watchId = navigator.geolocation.watchPosition((position) => {
          const { latitude, longitude } = position.coords;
          
          // Only update the marker position, DO NOT update mapCenter here.
          // This prevents the map from snapping back while the user is dragging.
          setCurrentPosition({
              lat: latitude,
              lng: longitude
          });
      }, 
      (error) => console.error(error), 
      { enableHighAccuracy: true }); // Good practice for ride apps

      return () => navigator.geolocation.clearWatch(watchId);
      
      // Note: Delete your other useEffect that uses setInterval(updatePosition, 10000)
      // watchPosition completely replaces the need for polling!
  }, [mapLoaded]);

  useEffect(()=>{
    console.log("Ride ID",rideId)
    socket.emit('join-ride',rideId)
    socket.on('captain-location',(data)=>{
        if(data?.lat && data?.lng)
        {
            setCaptainPosition({lat:data.lat,lng:data.lng})
        }
    })
    // return ()=>socket.disconnect()
  },[rideId])
  return (
    <>
        {
            !panelOpen && (
                <>
                    <div style={{position: 'relative'}}>
                        <HamburgerMenu/>
                    </div>
                    <div className="zoom">
                        <div className="buttons">
                            <p onClick={()=>setZoom(prev=>prev+1)}>+</p>
                            <div className="separator"></div>
                            <p onClick={()=>setZoom(prev=>prev-1)}>-</p>
                        </div>
                    </div>
                </>
            )
        }
<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter} // USE THE NEW SEPARATE STATE HERE
              zoom={zoom}
              onLoad={(map)=>{
                  mapRef.current=map
                  setMapLoaded(true)
                  calculateRoute()
              }}
              options={{
                  gestureHandling: "greedy", // CRITICAL: Allows 1-finger dragging on mobile
                  disableDefaultUI: false,
                  // draggable: true, <--- You can remove this, gestureHandling overrides it
              }}>
                {/* Current location marker with a distinct icon */}
                <Marker
                    position={currentPosition}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon for current location
                    }}
                />
                {
                    captainPosition && (
                        <Marker
                        position={captainPosition}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png", // Custom icon for current location
                        }}/>
                    )
                }
                {/* Pickup and Destination Markers */}
                {pickupCoordinates && destinationCoordinates && (
                    <>
                        {/* Pickup Marker */}
                        <Marker
                            position={pickupCoordinates}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green icon for pickup location
                            }}
                        />

                        {/* Destination Marker */}
                        <Marker
                            position={destinationCoordinates}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red icon for destination location
                            }}
                        />

                        {/* Route */}
                        {showRoute && directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} options={{
                                suppressMarkers: true, // Remove default A and B markers
                            }} />
                        )}
                    </>
                )}
            </GoogleMap>
        </LoadScript>
    </>
  )
})
