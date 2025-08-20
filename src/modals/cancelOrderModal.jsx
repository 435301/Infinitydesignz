import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CancelOrderModal = ({ show, handleClose, handleSubmit  }) => {
    const [note, setNote] = useState('');

  const onSubmit = () => {
    handleSubmit(note);
    setNote('');
  };

    const onHide = () => {
    setNote('');
    handleClose();
  };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cancel Order Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Reason for Cancellation</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="danger" onClick={onSubmit} disabled={!note.trim()}>Confirm Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CancelOrderModal;
