import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="create-button" onClick={onSubmit}>
            Create Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
