import React, { useState, useEffect } from 'react';
import { addFeatureTypes } from '../redux/actions/featureTypeAction';
import { useDispatch } from 'react-redux';

const AddFeatureTypeModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

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
         name: name,
       };
   
       try {
         await dispatch(addFeatureTypes(payload));
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
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Feature Type</h5>
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
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeatureTypeModal;
