import React,{useState} from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import { useContext } from 'react'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [firstname,setFirstName]=useState('')
  const [lastname,setLastName]=useState('')
  const [password,setPassword]=useState('')
  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')

  const {captain,setCaptain}=useContext(CaptainDataContext)
  const submit=async(e)=>{
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    }
    console.log(captainData)
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
    if(response.status===201)
    {
      const data=response.data
      setCaptain(data.captain)
      // localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }
    // setEmail('')
    // setFirstName('')
    // setLastName('')
    // setPassword('')
    // setVehicleColor('')
    // setVehiclePlate('')
    // setVehicleCapacity('')
    // setVehicleType('')
  }
  return (
    <div style={{width:'100%'}}>
      <div className='login-container'>
        <div style={{width:'100%'}}>
        <img className='login-logo' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt=""/>
            <form onSubmit={(e) => {
              submit(e)
            }}
            style={{width:'100%',marginLeft:'-1%'}}>

              <h3 className='heading'>What's your name</h3>
              <div className='signup-name'>
                <input
                  required
                  className='signup-input'
                  type="text"
                  placeholder='First name'
                  value={firstname}
                  onChange={(e)=>setFirstName(e.target.value)}
                />
                <input
                  required
                  className='signup-input'
                  type="text"
                  placeholder='Last name'
                  value={lastname}
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </div>

            <h3 className='heading'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='login-input signup-input'
              type="email"
              placeholder='email@example.com'
            />

            <h3 className='heading'>Enter Password</h3>

            <input
              className='login-input signup-input'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='password'
            />

          <h3 className='heading'>Vehicle Information</h3>
          <div className='vehicle-container'>
            <input
              required
              className='login-input signup-input'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='login-input signup-input'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='vehicle-container'>
            <input
              required
              className='login-input signup-input'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='login-input signup-input'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

            <button
              className='button'
            >Create account</button>

          </form>
          <p style={{textAlign:'center'}}>Already have a account? <Link to='/login' className='account'>Login here</Link></p>
        </div>
        <div>
          <p className='footer-base'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
  )
}

export default CaptainSignup