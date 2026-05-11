import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, User, Phone, ChevronRight, Bike, Hash } from "lucide-react";
import { CaptainDataContext } from "../context/CaptainContext"; // Assuming your context name
import { EditPopup } from "../components/edit-popup";
import axios from "axios";

const CaptainProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {captain,setCaptain} = useContext(CaptainDataContext);
  
  const [editPopup, setEditPopup] = useState({
    name: false,
    email: false,
    plate: false, // New field for Captain
    type: false,
    color: false,
    capacity: false
  });

  const handleEdit = async (field, inputValue) => {
    let updatedData = {};

    if (field === "name") {
      const nameArr = inputValue.trim().split(" ");
      updatedData = {
        fullname: { 
          firstname: nameArr[0] || "", 
          lastname: nameArr.slice(1).join(" ") || "" 
        }
      };
    } else if (field === "plate" || field==="color" || field==="capacity" || field==="vehicleType") {
      // Update nested vehicle data
      updatedData = {
        vehicle: { ...captain.vehicle, [field]: inputValue }
      };}
    else {
      updatedData = { [field]: inputValue };
    }
    try {
       await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/captain/captain-update-profile`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
    setCaptain(prev=>{
        return {
            ...prev,
            ...updatedData
        }
    });
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setEditPopup(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="header-left">
          <button onClick={() => navigate(-1)} className="back-btn"><ArrowLeft size={24} /></button>
          <h1>Captain Profile</h1>
        </div>
        <button className="help-btn"><HelpCircle size={20} /><span>Help</span></button>
      </header>

      <div className="profile-list">
        {/* Basic Info */}
        <div className="profile-item" onClick={() => setEditPopup(prev => ({...prev, name: true}))}>
          <div className="item-icon"><User size={22} /></div>
          <div className="item-content">
            <p className="label">Name</p>
            <p className="value">{captain?.fullname?.firstname} {captain?.fullname?.lastname}</p>
          </div>
          <ChevronRight size={20} className="arrow-icon" />
        </div>

        {/* Vehicle Info - Unique to Captain */}
        <div className="profile-item" onClick={() => setEditPopup(prev => ({...prev, plate: true}))}>
          <div className="item-icon"><Hash size={22} /></div>
          <div className="item-content">
            <p className="label">Vehicle Plate</p>
            <p className="value">{captain?.vehicle?.plate}</p>
          </div>
          <ChevronRight size={20} className="arrow-icon" />
        </div>

        <div className="profile-item no-click" onClick={() => setEditPopup(prev => ({...prev, vehicleType: true}))}>
          <div className="item-icon"><Bike size={22} /></div>
          <div className="item-content">
            <p className="label">Vehicle Type</p>
            <p className="value">{captain?.vehicle?.vehicleType}</p>
          </div>
            <ChevronRight size={20} className="arrow-icon" />
        </div>

        <div className="profile-item" onClick={() => setEditPopup(prev => ({...prev, color: true}))}>
          <div className="item-icon"><Hash size={22} /></div>
          <div className="item-content">
            <p className="label">Vehicle Colour</p>
            <p className="value">{captain?.vehicle?.color}</p>
          </div>
          <ChevronRight size={20} className="arrow-icon" />
        </div>

        <div className="profile-item" onClick={() => setEditPopup(prev => ({...prev, capacity: true}))}>
          <div className="item-icon"><Hash size={22} /></div>
          <div className="item-content">
            <p className="label">Vehicle Capacity</p>
            <p className="value">{captain?.vehicle?.capacity}</p>
          </div>
          <ChevronRight size={20} className="arrow-icon" />
        </div>

        <div className="profile-item no-click">
          <div className="item-icon"><Phone size={22} /></div>
          <div className="item-content">
            <p className="label">Mobile</p>
            <p className="value">{captain?.mobile}</p>
          </div>
        </div>
      </div>

      {editPopup.name && <EditPopup name="name" saveEdit={handleEdit} setEditPopup={setEditPopup} />}
      {editPopup.plate && <EditPopup name="plate" saveEdit={handleEdit} setEditPopup={setEditPopup} />}
      {editPopup.color && <EditPopup name="color" saveEdit={handleEdit} setEditPopup={setEditPopup} />}
      {editPopup.vehicleType && <EditPopup name="vehicleType" saveEdit={handleEdit} setEditPopup={setEditPopup} />}
      {editPopup.capacity && <EditPopup name="capacity" saveEdit={handleEdit} setEditPopup={setEditPopup} />}
    </div>
  );
};

export default CaptainProfile;