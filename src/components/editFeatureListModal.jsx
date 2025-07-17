import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { addFeatureList, editFeatureList } from '../redux/actions/featureListAction';
import { fetchFeatureSets } from '../redux/actions/featureSetAction';
import { fetchFeatureTypes } from '../redux/actions/featureTypeAction';

const EditFeatureListModal = ({ show, onClose, featureList }) => {
    const dispatch = useDispatch();
    const { featureSets = [] } = useSelector((state) => state.featureSets);
    const { featureTypes = [] } = useSelector((state) => state.featureTypes);
    // console.log('featureTypes',featureTypes)
    const [formFields, setFormFields] = useState([{ label: '', priority: 1 }]);
    const [featureSetId, setFeatureSetId] = useState('');
    const [featureTypeId, setFeatureTypeId] = useState('');
    const [status, setStatus] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchFeatureSets());
        dispatch(fetchFeatureTypes());
    }, [dispatch]);

    useEffect(() => {
        if (featureList) {
            setFormFields([{ label: featureList.label || '', priority: featureList.priority || 1 }]);
            setFeatureSetId(featureList.featureSetId?.toString() || '');
            setStatus(featureList.status ?? true);

            // Derive featureTypeId from nested featureSet
            if (featureList.featureSet?.featureTypeId) {
                setFeatureTypeId(featureList.featureSet.featureTypeId.toString());
            }
        }
    }, [featureList]);


    const validate = () => {
        const newErrors = {};
        if (!featureSetId) newErrors.featureSetId = 'Feature Set is required';
        if (!featureTypeId) newErrors.featureTypeId = 'Feature Type is required';
        formFields.forEach((field, index) => {
            if (!field.label.trim()) {
                newErrors[`label-${index}`] = 'Label is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (index, key, value) => {
        const updated = [...formFields];
        updated[index][key] = value;
        setFormFields(updated);
    };

    const handleAddField = () => {
        setFormFields([...formFields, { label: '', priority: 1 }]);
    };

    const handleRemoveField = (index) => {
        const updated = formFields.filter((_, i) => i !== index);
        setFormFields(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            for (let field of formFields) {
                await dispatch(editFeatureList({
                    id:featureList.id,
                    label: field.label,
                    priority: Number(field.priority),
                    status: status,
                    featureSetId: parseInt(featureSetId)
                }));
            }
            onClose();
            setFormFields([{ label: '', priority: 1 }]);
            setFeatureSetId('');
            setFeatureTypeId('');
            setStatus(true);
        } catch (err) {
            setErrors({ general: err?.response?.data?.message || 'Something went wrong.' });
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Feature List</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Feature Type <span className="text-danger">*</span></label>
                                <select
                                    className={`form-control ${errors.featureTypeId ? 'is-invalid' : ''}`}
                                    value={featureTypeId}
                                    onChange={(e) => setFeatureTypeId(e.target.value)}
                                >
                                    <option value="">-- Select Feature Type --</option>
                                    {featureTypes.map((fs) => (
                                        <option key={fs.id} value={fs.id}>{fs.name}</option>
                                    ))}
                                </select>
                                {errors.featureTypeId && (
                                    <div className="invalid-feedback">{errors.featureTypeId}</div>
                                )}
                            </div>
                            {/* Feature Set Dropdown */}
                            <div className="mb-3">
                                <label className="form-label">Feature Set <span className="text-danger">*</span></label>
                                <select
                                    className={`form-control ${errors.featureSetId ? 'is-invalid' : ''}`}
                                    value={featureSetId}
                                    onChange={(e) => setFeatureSetId(e.target.value)}
                                >
                                    <option value="">-- Select Feature Set --</option>
                                    {featureSets.map((fs) => (
                                        <option key={fs.id} value={fs.id}>{fs.title}</option>
                                    ))}
                                </select>
                                {errors.featureSetId && (
                                    <div className="invalid-feedback">{errors.featureSetId}</div>
                                )}
                            </div>


                            {formFields.map((field, index) => (
                                <div className="mb-3 d-flex align-items-center gap-2" key={index}>
                                    <input
                                        className={`form-control ${errors[`label-${index}`] ? 'is-invalid' : ''}`}
                                        type="text"
                                        placeholder="Label"
                                        value={field.label}
                                        onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                                    />
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="Priority"
                                        value={field.priority}
                                        onChange={(e) => handleInputChange(index, 'priority', e.target.value)}
                                        style={{ maxWidth: '100px' }}
                                    />
                                    {formFields.length > 1 && (
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveField(index)}>
                                            <BsDashCircle />
                                        </button>
                                    )}
                                    {index === formFields.length - 1 && (
                                        <button type="button" className="btn btn-outline-primary" onClick={handleAddField}>
                                            <BsPlusCircle />
                                        </button>
                                    )}
                                    {errors[`label-${index}`] && (
                                        <div className="invalid-feedback d-block ms-2">{errors[`label-${index}`]}</div>
                                    )}
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
                            <button type="submit" className="btn btn-success px-4">Save</button>
                            <button type="button" className="btn btn-danger px-4" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFeatureListModal;
