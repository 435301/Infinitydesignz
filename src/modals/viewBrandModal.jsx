import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewBrandModal = ({ show, onClose, brand }) => {
  if (!brand) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
           <p><strong>Brand:</strong> {brand.name}</p>
          <p className="form-control-plaintext"></p>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Status:</label>
          <p className={`badge ${brand.status ? 'bg-success' : 'bg-danger'}`}>
            {brand.status ? 'Active' : 'Inactive'}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewBrandModal;
