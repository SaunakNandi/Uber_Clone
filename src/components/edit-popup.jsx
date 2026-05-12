import { useState } from "react";
import { createPortal } from "react-dom";
export const EditPopup = ({ name, saveEdit, setEditPopup }) => {
    const [inputValue,setInputValue]=useState("")
    const [error,setError]=useState(false)
    function validate(){
      switch(name){
        case 'name':
          var regex1 = /^[A-Za-z ]{3,50}$/;
          if(!regex1.test(inputValue))
            return "Invalid name"
          break;
        case 'email':
          var regex2 =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!regex2.test(inputValue)) return "Invalid email"
          break;
        case 'plate':
          var plateRegex=/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/
          var val=inputValue.toUpperCase()
          if(!plateRegex.test(val))
            return "Invalid vehicle plate"
          break;
        case 'vehicleType':
          var vehicleArr=["car","moto","auto"];
          if(!vehicleArr.includes(inputValue.toLowerCase())) return "This vehicle is not present with us. Choose between [car,moto,auto]"
          break;
        case 'color':
          var colorRegex=/^[A-Z]{3,15}$/i;
          if(!colorRegex.test(inputValue)) return "Seems like an invalid color"
          break; 
          
        case 'capacity':
          if(inputValue<2 || inputValue>8) return "Capacity of vehicle should be between 2 - 8"
          break;
        default:
          return ""
      }
    }
    function handleSave(){
      const express=validate()
      if(express)
      {
        setError(express)
      }else saveEdit(name,inputValue)
    }
  return createPortal(
    <div className="edit-popup">
      <div className="edit-box">
        <div className="edit-header">
          <p>Edit your {name}</p>
          <button
            onClick={() =>
              setEditPopup((prev) => {
                return {
                  ...prev,
                  [name]: false,
                };
              })
            }
          >
            X
          </button>
        </div>
        <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className="edit-popup-style" />
        {error && <p style={{color:'red',fontWeight: 600}}>{error}</p>}
        <button
          className="edit-popup-save-details"
          onClick={() => handleSave(name,inputValue)}
        >
          Save
        </button>
      </div>
    </div>,document.body
  );
};
