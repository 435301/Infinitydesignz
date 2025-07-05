import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewColorModal = ({ show, onClose, color }) => {
  if (!color) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Color</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
           <p><strong>Title:</strong> {color.label}</p>
          <p className="form-control-plaintext"></p>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Status:</label>
          <p className={`badge ${color.status ? 'bg-success' : 'bg-danger'}`}>
            {color.status ? 'Active' : 'Inactive'}
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

export default ViewColorModal;
