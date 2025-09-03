import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { addColors } from '../redux/actions/colorAction';
import { useDispatch } from 'react-redux';

const AddColorModal = ({ show, onClose }) => {
    const dispatch = useDispatch();
  const [label, setLabel] = useState('');
  const [hex_code, setHexCode] = useState('#000000'); 
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState('')

  const handleColorChange = (color) => {
    setHexCode(color.hex.toUpperCase());
  };

     const validate = () => {
        const newErrors = {};
        if (!label.trim()) newErrors.label = 'Color label is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
        label,
        status, 
        hex_code,
    };

    console.log('payload', payload)

    try {
        await dispatch(addColors(payload)); 
        onClose();
        setLabel('');
        setHexCode('')
        setStatus(false);
    } catch (err) {
        if (err?.response?.data?.message) {
            setErrors({ label: err.response.data.message });
        } else {
            setErrors({ label: 'Something went wrong. Try again.' });
        }
    }
};
  if (!show) return null;

  return (
    <div className="modal fade show d-block new-1" >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Color</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Color Label<span className="text-danger">*</span></label>
                <input
                  type="text"
                 className={`form-control ${errors.label ? 'is-invalid' : ''}`}
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
                {errors.label && <div className="invalid-feedback">{errors.label}</div>}
              </div>
                
              <div className="mb-3">
                <label>Select Color</label>
                <ChromePicker color={hex_code} onChange={handleColorChange} />
              </div>

              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
                 {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                <label className="form-check-label">Active</label>
              </div>
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

export default AddColorModal;
