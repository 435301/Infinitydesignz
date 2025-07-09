import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewFeatureTypeModal = ({ show, onClose, featureType }) => {
  if (!featureType) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Feature Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
           <p><strong>Title:</strong> {featureType.name}</p>
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

export default ViewFeatureTypeModal;
