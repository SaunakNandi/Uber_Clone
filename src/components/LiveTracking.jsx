import React,{useState,useEffect, useContext, useRef} from 'react'
import { LoadScript,Marker,GoogleMap,DirectionsRenderer } from '@react-google-maps/api'
import { JourneyContext } from '../context/JourneyContext';
import HamburgerMenu from './HamburgerMenu';
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523
};
export const LiveTracking = ({showRoute=false,setPickup}) => {
  const [ currentPosition, setCurrentPosition ] = useState(center);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const {coordinates, updateCoordinates}=useContext(JourneyContext)
  const mapRef=useRef(null)
  const [mapLoaded,setMapLoaded]=useState(false)
//   console.log("Show my route ",showRoute)
//   console.log("Coordinates ",coordinates)
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
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          if(mapLoaded)
            getAddressFromCoords(latitude,longitude)
          setCurrentPosition({
              lat: latitude,
              lng: longitude
          });
      });

      const watchId = navigator.geolocation.watchPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
              lat: latitude,
              lng: longitude
          });
      });

      return () => navigator.geolocation.clearWatch(watchId);
  }, [mapLoaded]);

  useEffect(() => {
      const updatePosition = () => {
          navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;

            //   console.log('Position updated:', latitude, longitude);
              setCurrentPosition({
                  lat: latitude,
                  lng: longitude
              });
          });
      };

      updatePosition(); // Initial position update

      const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

  }, []);
  return (
    <>
    <div style={{position: 'relative'}}>
          <HamburgerMenu/>
      </div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={currentPosition}
              zoom={11}
              onLoad={(map)=>{
                mapRef.current=map
                setMapLoaded(true)
                calculateRoute()
              }}
          >
              {/* Current location marker with a distinct icon */}
              <Marker
                  position={currentPosition}
                  icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon for current location
                  }}
              />

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
}
