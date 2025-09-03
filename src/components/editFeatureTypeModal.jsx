import React, { useState, useEffect } from 'react';
import { addFeatureTypes, editFeatureTypes } from '../redux/actions/featureTypeAction';
import { useDispatch } from 'react-redux';

const EditFeatureTypeModal = ({ show, onClose, featureType }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (featureType) {
            setName(featureType.name || '');
        }
    }, [featureType, show]);


    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Title is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const payload = {
            id: featureType.id,
            name: name,
        };

        try {
            await dispatch(editFeatureTypes(payload));
            onClose();
            setName('')
        } catch (err) {
            setErrors({
                name: err?.response?.data?.message || 'Something went wrong.',
            });
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block new-1" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit a Feature Type<span className='text-danger'>*</span></h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    id="name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                                    }}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFeatureTypeModal;
