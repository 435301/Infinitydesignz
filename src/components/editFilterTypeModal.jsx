import React, { useState , useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {  editFilterTypes } from '../redux/actions/filterTypeAction';
import { useDispatch } from 'react-redux';

const EditFilterTypeModal = ({ show, onClose, filterType }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        if(filterType){
            setTitle(filterType.name)
        }
    },[filterType, show])

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
            id: filterType.id,
            name: title,
        };

        try {
            await dispatch(editFilterTypes(payload));
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
                <Modal.Title>Edit Filter Type<span className='text-danger'>*</span></Modal.Title>
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
                     <div className="modal-footer">
                    <button type="submit" className="btn btn-success px-4">Save</button>
                    <button type="button" className="btn btn-danger px-4" onClick={onClose}>Close</button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditFilterTypeModal;
