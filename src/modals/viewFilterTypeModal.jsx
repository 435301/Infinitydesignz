import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewFilterTypeModal = ({ show, onClose, filterType }) => {
  if (!filterType) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Filter Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
           <p><strong>Title:</strong> {filterType.name}</p>
          <p className="form-control-plaintext"></p>
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

export default ViewFilterTypeModal;
