import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addFilterTypes } from '../redux/actions/filterTypeAction';
import { useDispatch } from 'react-redux';

const AddFilterTypeModal = ({ show, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const payload = {
            name: title,
        };

        try {
            await dispatch(addFilterTypes(payload));
            onClose();
            setTitle('')
        } catch (err) {
            setErrors({
                name: err?.response?.data?.message || 'Something went wrong.',
            });
        }
    };



    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Filter Type</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (errors.title) setErrors(prev => ({ ...prev, title: null }));
                            }}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                  
                </Modal.Body>

                <Modal.Footer>
                    <button type="submit" className="btn btn-success px-4">Save</button>
                    <button type="button" className="btn btn-danger px-4" onClick={onClose}>Close</button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddFilterTypeModal;
