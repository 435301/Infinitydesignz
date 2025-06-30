
import React from 'react';
import '../css/modal.css';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="custom-modal-wrapper d-flex justify-content-center align-items-center">
      <div className="modal-box">
        <div className="modal-top d-flex justify-content-between align-items-center">
          <h3>{title}</h3>
          <button className="close-icon" onClick={onClose}>× Close</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
