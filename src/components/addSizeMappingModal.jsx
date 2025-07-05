import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SizeMappingModal = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        category: '',
        subcategory: '',
        brand: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Size Mapping:', formData);
        // Submit logic here (e.g., API call or Redux dispatch)
        onClose(); // Close modal after submission
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Size Mapping</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select
                                id="category"
                                name="category"
                                className="form-control"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>- Select Category -</option>
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                <option value="category3">Category 3</option>
                            </select>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <label htmlFor="subcategory" className="form-label">Sub Category</label>
                            <select
                                id="subcategory"
                                name="subcategory"
                                className="form-control"
                                value={formData.subcategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>- Select Sub Category -</option>
                                <option value="subcategory1">Sub Category 1</option>
                                <option value="subcategory2">Sub Category 2</option>
                                <option value="subcategory3">Sub Category 3</option>
                            </select>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <label htmlFor="brand" className="form-label">Brand</label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                className="form-control"
                                placeholder="Enter Brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-lg-6 mt-4">
                            <button type="button" className="btn btn-success btn-sm">+ Create a Brand</button>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success px-4">Submit</button>
                        <button type="button" className="btn btn-danger px-4" onClick={onClose}>Close</button>
                    </Modal.Footer>

                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default SizeMappingModal;
