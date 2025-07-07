import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewSizeModal = ({ show, onClose, size }) => {
  if (!size) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Size</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
           <p><strong>Title:</strong> {size.title}</p>
          <p className="form-control-plaintext"></p>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Status:</label>
          <p className={`badge ${size.status ? 'bg-success' : 'bg-danger'}`}>
            {size.status ? 'Active' : 'Inactive'}
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

export default ViewSizeModal;
