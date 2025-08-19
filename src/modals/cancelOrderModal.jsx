
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CancelOrderModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="p-2">
        <Modal.Title>Cancel Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to cancel this order?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, Cancel Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelOrderModal;
