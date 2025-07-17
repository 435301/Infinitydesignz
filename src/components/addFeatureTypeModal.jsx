import React, { useState } from 'react';
import { addFeatureTypes } from '../redux/actions/featureTypeAction';
import { useDispatch } from 'react-redux';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';

const AddFeatureTypeModal = ({ show, onClose }) => {
  const dispatch = useDispatch();

  const [featureTypes, setFeatureTypes] = useState([{ name: '' }]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    featureTypes.forEach((field, index) => {
      if (!field.name.trim()) {
        newErrors[`name-${index}`] = 'Title is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (index, value) => {
    const updated = [...featureTypes];
    updated[index].name = value;
    setFeatureTypes(updated);

    if (errors[`name-${index}`]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[`name-${index}`];
      setErrors(updatedErrors);
    }
  };

  const handleAddField = () => {
    setFeatureTypes([...featureTypes, { name: '' }]);
  };

  const handleRemoveField = (index) => {
    const updated = featureTypes.filter((_, i) => i !== index);
    setFeatureTypes(updated);

    const updatedErrors = { ...errors };
    delete updatedErrors[`name-${index}`];
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      for (let item of featureTypes) {
        await dispatch(addFeatureTypes({ name: item.name }));
      }
      onClose();
      setFeatureTypes([{ name: '' }]);
    } catch (err) {
      setErrors({
        general: err?.response?.data?.message || 'Something went wrong.',
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
              <h5 className="modal-title">Add Feature Types</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {featureTypes.map((field, index) => (
                <div className="mb-3" key={index}>
                  <label className="form-label">Feature Type<span className='text-danger'>*</span></label>
                  <div className="d-flex align-items-center">
                    <input
                      className={`form-control ${errors[`name-${index}`] ? 'is-invalid' : ''}`}
                      type="text"
                      placeholder="Title"
                      value={field.name}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    {featureTypes.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger ms-2"
                        onClick={() => handleRemoveField(index)}
                      >
                        <BsDashCircle />
                      </button>
                    )}
                    {index === featureTypes.length - 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-primary ms-2"
                        onClick={handleAddField}
                      >
                        <BsPlusCircle />
                      </button>
                    )}
                  </div>
                  {errors[`name-${index}`] && (
                    <div className="invalid-feedback d-block mt-1">{errors[`name-${index}`]}</div>
                  )}
                </div>
              ))}
              {errors.general && (
                <div className="text-danger text-center mt-2">{errors.general}</div>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success px-4">Save</button>
              <button type="button" className="btn btn-danger px-4" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeatureTypeModal;
