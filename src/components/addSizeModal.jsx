import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSizes } from '../redux/actions/sizeAction';
import '../css/admin/style.css';

const AddSizeModal = ({ show, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(false);
    console.log('title', title, status)
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Size title is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

     const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (errors.title && value.trim()) {
      setErrors((prev) => ({ ...prev, title: null }));
    }
  };


    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
        title,
        status, 
    };

    try {
        await dispatch(addSizes(payload)); 
        onClose();
        setTitle('');
        setStatus(false);
    } catch (err) {
        if (err?.response?.data?.message) {
            setErrors({ title: err.response.data.message });
        } else {
            setErrors({ title: 'Something went wrong. Try again.' });
        }
    }
};



    if (!show) return null;

    return (
        <div className="modal fade show d-block new-1" tabIndex="-1" >
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} className="app-form" encType="multipart/form-data">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Size</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Size Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter Size Title"
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>

                            <div className="form-check mt-4 ps-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="status"
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                />
                                 {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                                <label className="form-check-label ms-2" htmlFor="status">
                                    Active
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success px-4">Submit</button>
                            <button type="button" className="btn btn-danger px-4" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSizeModal;
