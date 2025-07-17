import React, { useEffect, useState } from 'react';
import { addFeatureTypes, fetchFeatureTypes } from '../redux/actions/featureTypeAction';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { addFeatureSet } from '../redux/actions/featureSetAction';

const AddFeatureSetModal = ({ show, onClose }) => {
    const dispatch = useDispatch();
    const { featureTypes = [] } = useSelector((state) => state.featureTypes || {});
    //   console.log('featureTypes',featureTypes)

    const [featureTypesInput, setFeatureTypesInput] = useState([{ title: '', priority: '' }]);
    const [selectedFeatureTypeId, setSelectedFeatureTypeId] = useState('');
    const [errors, setErrors] = useState({});
        const [status, setStatus] = useState(true);
    

    useEffect(() => {
        dispatch(fetchFeatureTypes());
    }, [dispatch]);

    const validate = () => {
        const newErrors = {};

        if (!selectedFeatureTypeId) {
            newErrors.menu = 'Feature Type is required';
        }

        featureTypesInput.forEach((field, index) => {
            if (!field.title.trim()) {
                newErrors[`title-${index}`] = 'Title is required';
            }
            if (!field.priority || isNaN(field.priority)) {
                newErrors[`priority-${index}`] = 'Priority must be a number';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (index, field, value) => {
        const updated = [...featureTypesInput];
        updated[index][field] = value;
        setFeatureTypesInput(updated);

        const errorKey = `${field}-${index}`;
        if (errors[errorKey]) {
            const updatedErrors = { ...errors };
            delete updatedErrors[errorKey];
            setErrors(updatedErrors);
        }
    };

    const handleFeatureSetChange = (e) => {
        setSelectedFeatureTypeId(e.target.value);
        if (errors.menu) {
            const updatedErrors = { ...errors };
            delete updatedErrors.menu;
            setErrors(updatedErrors);
        }
    };

    const handleAddField = () => {
        setFeatureTypesInput([...featureTypesInput, { title: '' }]);
    };

    const handleRemoveField = (index) => {
        const updated = featureTypesInput.filter((_, i) => i !== index);
        setFeatureTypesInput(updated);

        const updatedErrors = { ...errors };
        delete updatedErrors[`title-${index}`];
        setErrors(updatedErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            for (let item of featureTypesInput) {
                const payload = {
                    title: item.title,
                    featureTypeId: Number(selectedFeatureTypeId),
                    priority: Number(item.priority),
                                        status: status,

                }
                console.log('Payload being sent:', payload);
                await dispatch(addFeatureSet(payload));
            }
            onClose();
            setFeatureTypesInput([{ title: '', priority: '' }]);
            setSelectedFeatureTypeId('');
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
                            <h5 className="modal-title">Add Feature Set</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">
                                    Feature Type <span className="text-danger">*</span>
                                </label>
                                <select
                                    className={`form-control ${errors.menu ? 'is-invalid' : ''}`}
                                    value={selectedFeatureTypeId}
                                    onChange={handleFeatureSetChange}
                                >
                                    <option value="">-- Select Feature Type --</option>
                                    {featureTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.menu && <div className="invalid-feedback">{errors.menu}</div>}
                            </div>

                            {featureTypesInput.map((field, index) => (
                                <div className="mb-3 d-flex align-items-start gap-2" key={index}>
                                    <div className="flex-fill">
                                        <input
                                            className={`form-control mb-1 ${errors[`title-${index}`] ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder="Feature Set Title"
                                            value={field.title}
                                            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                        />
                                        {errors[`title-${index}`] && (
                                            <div className="invalid-feedback d-block">{errors[`title-${index}`]}</div>
                                        )}
                                    </div>
                                    <div style={{ width: '120px' }}>
                                        <input
                                            className={`form-control mb-1 ${errors[`priority-${index}`] ? 'is-invalid' : ''}`}
                                            type="number"
                                            placeholder="Priority"
                                            value={field.priority}
                                            onChange={(e) => handleInputChange(index, 'priority', e.target.value)}
                                        />
                                        {errors[`priority-${index}`] && (
                                            <div className="invalid-feedback d-block">{errors[`priority-${index}`]}</div>
                                        )}
                                    </div>
                                    <div className="d-flex flex-column">
                                        {featureTypesInput.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger mb-1"
                                                onClick={() => handleRemoveField(index)}
                                            >
                                                <BsDashCircle />
                                            </button>
                                        )}
                                        {index === featureTypesInput.length - 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={handleAddField}
                                            >
                                                <BsPlusCircle />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="form-check form-switch mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={status}
                                    onChange={() => setStatus(!status)}
                                    id="statusSwitch"
                                />
                                <label className="form-check-label" htmlFor="statusSwitch">
                                    Status: {status ? 'Active' : 'Inactive'}
                                </label>
                            </div>


                            {errors.general && (
                                <div className="text-danger text-center mt-2">{errors.general}</div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success px-4">
                                Save
                            </button>
                            <button type="button" className="btn btn-danger px-4" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFeatureSetModal;
