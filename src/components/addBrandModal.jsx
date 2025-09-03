import React, { useState } from 'react';
import { addBrands } from '../redux/actions/brandAction';
import { useDispatch } from 'react-redux';

const AddBrandModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!brand.trim()) newErrors.brand = 'Brand is required';
    if (status === null) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: brand,
      status,
    };

    try {
      await dispatch(addBrands(payload));
      onClose();
      setBrand('');
      setStatus(false);
    } catch (err) {
      setErrors({
        brand: err?.response?.data?.message || 'Something went wrong.',
      });
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block new-1 new-1">
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <form onSubmit={handleSubmit} className="app-form">
            <div className="modal-header">
              <h5 className="modal-title">Create a Brand</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <label htmlFor="brand" className="form-label">
                    Brand <span className="text-danger">*</span>
                  </label>
                  <input
                    id="brand"
                    name="brand"
                    placeholder="Enter Brand"
                    className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
                    type="text"
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      if (errors.brand) setErrors((prev) => ({ ...prev, brand: null }));
                    }}
                  />
                  {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
                </div>

                <div className="col-lg-12 mb-3 form-check m-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="status"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                  <label className="form-check-label ms-2" htmlFor="status">
                    Active
                  </label>
                  {errors.status && <div className="invalid-feedback d-block">{errors.status}</div>}
                </div>
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

export default AddBrandModal;
