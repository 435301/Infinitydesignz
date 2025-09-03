import React from 'react';
import BASE_URL from '../config/config';

const ViewSliderModal = ({ isOpen, onClose, slider }) => {
  if (!isOpen || !slider) return null;

  return (
    <div className="modal d-block fade show" tabIndex="-1" >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View Slider</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <strong>Title:</strong>
              <p>{slider.title}</p>
            </div>
            <div className="mb-3">
              <strong>Link:</strong>
              <p>
                <a href={slider.link} target="_blank" rel="noopener noreferrer">
                  {slider.link}
                </a>
              </p>
            </div>
            <div className="mb-3">
              <strong>Priority:</strong>
              <p>{slider.priority}</p>
            </div>
            <div className="mb-3">
              <strong>Status:</strong>
              <p>
                <span className={`badge ${slider.status ? 'bg-success' : 'bg-secondary'} text-light`}>
                  {slider.status ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
            <div className="mb-3">
              <strong>Slider Image:</strong>
              <br />
              <img src={`${BASE_URL}${slider.image_url}`} alt={slider.title} width="100%" />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSliderModal;
