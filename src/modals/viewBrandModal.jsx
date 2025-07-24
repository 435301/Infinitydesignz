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
  <div className="mb-2 row">
    <label className="col-sm-3 col-form-label fw-bold">Brand:</label>
    <div className="col-sm-9">
      <p className="form-control-plaintext mb-0">{brand.name || 'N/A'}</p>
    </div>
  </div>

  <div className="mb-2 row align-items-center">
    <label className="col-sm-3 col-form-label fw-bold">Status:</label>
    <div className="col-sm-9">
      <span className={` ${brand.status ? 'text-success' : 'text-danger'}`}>
        {brand.status ? 'Active' : 'Inactive'}
      </span>
    </div>
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
