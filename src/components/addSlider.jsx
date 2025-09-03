import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddSliderModal = ({ isOpen, onClose, onSubmit }) => {
    const [sliderImage, setSliderImage] = useState(null);
    const [sliderPreview, setSliderPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState(true);
     const [formErrors, setFormErrors] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
         if (formErrors.image) {
        setFormErrors(prev => ({ ...prev, image: undefined }));
    }
        if (file) {
            setSliderImage(file);
            const reader = new FileReader();
            reader.onload = () => setSliderPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

        const validateForm = () => {
        const errors = {};
        if (!title.trim()) errors.title = 'Title is required.';
        if (!link.trim()) errors.link = 'Link is required.';
        if (!sliderImage) errors.image = 'Slider image is required.';
        if (!priority.trim()) {
            errors.priority = 'Priority is required.';
        } else if (isNaN(priority) || Number(priority) <= 0) {
            errors.priority = 'Priority must be a positive number.';
        }
        return errors;
    };

    const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (formErrors.title) {
        setFormErrors(prev => ({ ...prev, title: undefined }));
    }
};

const handleLinkChange = (e) => {
    setLink(e.target.value);
    if (formErrors.link) {
        setFormErrors(prev => ({ ...prev, link: undefined }));
    }
};

const handlePriorityChange = (e) => {
    const value = e.target.value;
    setPriority(value);
    if (formErrors.priority) {
        setFormErrors(prev => ({ ...prev, priority: undefined }));
    }
};



    const removeImage = () => {
        setSliderImage(null);
        setSliderPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const formData = new FormData();
        formData.append('image', sliderImage);
        formData.append('title', title);
        formData.append('link', link);
        formData.append('priority', priority);
        formData.append('status', status);

        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal d-block fade show" tabIndex="-1" >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form className="app-form" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Create a Slider</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Title <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder="Enter Slider Title"
                                    />
                                     {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Link <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${formErrors.link ? 'is-invalid' : ''}`}
                                        value={link}
                                        onChange={handleLinkChange}
                                        placeholder='Enter Slider Link'
                                    />
                                     {formErrors.link && <div className="invalid-feedback">{formErrors.link}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Slider Image (100x100) <span className="text-danger">*</span></label>
                                    <input
                                        type="file"
                                         className={`form-control ${formErrors.image ? 'is-invalid' : ''}`}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        placeholder='Upload Slider Image'
                                    />
                                    {formErrors.image && <div className="invalid-feedback">{formErrors.image}</div>}
                                    {sliderPreview && (
                                        <div className="mt-2">
                                            <img src={sliderPreview} alt="Preview" width="100" />
                                            <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={removeImage}>Remove</button>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Priority <span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                         className={`form-control ${formErrors.priority ? 'is-invalid' : ''}`}
                                        value={priority}
                                        onChange={handlePriorityChange}
                                        placeholder="Enter Slider Priority"
                                    />
                                    {formErrors.priority && <div className="invalid-feedback">{formErrors.priority}</div>}
                                </div>
                                <div className="col-md-12 mb-3 form-check mt-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={status}
                                        onChange={(e) => setStatus(e.target.checked)}
                                        id="status"
                                    />
                                    <label className="form-check-label ms-2" htmlFor="status">Active</label>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="button" className="btn btn-danger" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSliderModal;
