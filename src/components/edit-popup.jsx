import { useState } from "react";
import { createPortal } from "react-dom";
export const EditPopup = ({ name, saveEdit, setEditPopup }) => {
    const [inputValue,setInputValue]=useState("")
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
        <button
          className="edit-popup-save-details"
          onClick={() => saveEdit(name,inputValue)}
        >
          Save
        </button>
      </div>
    </div>,document.body
  );
};
