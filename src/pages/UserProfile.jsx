import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  User,
  Phone,
  Mail,
  ChevronRight,
  Award,
} from "lucide-react";
import "../Style.css";
import { UserDataContext } from "../context/userContext";
import { EditPopup } from "../components/edit-popup";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('token')
  // Mock data - replace with your context or API data
  const { user, setUser } = useContext(UserDataContext);
  const [editPopup, setEditPopup] = useState({
    email: false,
    name: false,
  });


  const handleEdit = async(field, inputValue) => {
    let updateData={}
    if (field === "name") {
      const nameArr = inputValue.trim().split(" "); // <-- ADDED: .trim() to remove accidental spaces

      // <-- FIXED (Point 4): Safe handling for single-word names
      const firstname = nameArr[0] || "";
      const lastname = nameArr.slice(1).join(" ") || "";
      updateData={
        fullname: {
            firstname,
            lastname,
          },
          email:user.email
      }
      setUser((prev) => {
        return {
          ...prev,
          fullname: {
            firstname,
            lastname,
          },
        };
      });
      setEditPopup((prev) => ({ ...prev, [field]: false }));
    } else {
      setUser((prev) => {
        return {
          ...prev,
          email: inputValue,
        };
      });
      setEditPopup((prev) => ({ ...prev, [field]: false }));
      updateData={
        fullname:{...user.fullname},
        email:inputValue
      }
    }
    try {
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/user-update-profile`,updateData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
    } catch (error) {
      console.log("Error while updating profile data ",error)
    }
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <div className="header-left">
          <button onClick={() => navigate(-1)} className="back-btn">
            <ArrowLeft size={24} />
          </button>
          <h1>Profile</h1>
        </div>
        <button className="help-btn">
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
      </header>

      {/* Profile List */}
      <div className="profile-list">
        {/* Name Section */}
        <div
          className="profile-item"
          onClick={() =>
            setEditPopup((prev) => {
              return { ...prev, name: true };
            })
          }
        >
          <div className="item-icon">
            <User size={22} />
          </div>
          <div className="item-content">
            <p className="label">Name</p>
            <p className="value">
              {user.fullname.firstname} {user.fullname.lastname}
            </p>
          </div>
          <ChevronRight size={20} className="arrow-icon" />
        </div>

        {/* Phone Section - Usually non-editable in apps like Rapido */}
        <div className="profile-item no-click">
          <div className="item-icon">
            <Phone size={22} />
          </div>
          <div className="item-content">
            <p className="label">Phone Number</p>
            <p className="value">{user.mobile}</p>
          </div>
          {/* No arrow because phone usually requires OTP to change */}
        </div>

        {/* Email Section */}
        <div
          className="profile-item"
          onClick={() =>
            setEditPopup((prev) => {
              return { ...prev, email: true };
            })
          }
        >
          <div className="item-icon">
            <Mail size={22} />
          </div>
          <div className="item-content">
            <p className="label">Email</p>
            <p className="value">{user.email}</p>
          </div>
          <ChevronRight size={20} className="arrow-icon" />
        </div>

        {/* Member Since Section - Non editable */}

        <div className="profile-item no-click">
          <div className="item-icon">
            <Award size={22} />
          </div>
          <div className="item-content">
            <p className="label">Member Since</p>
            <p className="value">{user.memberSince}</p>
          </div>
        </div>
      </div>
      {editPopup.email && (
        <EditPopup
          name={"email"}
          saveEdit={handleEdit}
          setEditPopup={setEditPopup}
        />
      )}
      {editPopup.name && (
        <EditPopup
          name={"name"}
          saveEdit={handleEdit}
          setEditPopup={setEditPopup}
        />
      )}
    </div>
  );
};

export default UserProfile;
