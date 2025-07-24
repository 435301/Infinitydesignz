import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { addFilterList, editFilterList, fetchFilterLists } from '../redux/actions/filterListActions';
import { fetchFilterTypes } from '../redux/actions/filterTypeAction';

const EditFilterListModal = ({ show, onClose, filterList }) => {
    const dispatch = useDispatch();
    const { filterSets = [] } = useSelector((state) => state.filterSets);
    const { filterTypes = [] } = useSelector((state) => state.filterTypes);
    // console.log('featureTypes',featureTypes)
    const [formFields, setFormFields] = useState([{ label: '', priority: 1 }]);
    const [filterSetId, setFilterSetId] = useState('');
    const [filterTypeId, setFilterTypeId] = useState('');
    const [status, setStatus] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchFilterLists());
        dispatch(fetchFilterTypes());
    }, [dispatch]);

    useEffect(() => {
        if (filterList) {
            setFormFields([{ label: filterList.label || '', priority: filterList.priority || 1 }]);
            setFilterSetId(filterList.filterSetId?.toString() || '');
            setStatus(filterList.status ?? true);

            if (filterList.filterSet?.filterTypeId) {
                setFilterTypeId(filterList.filterSet.filterTypeId.toString());
            }
        }
    }, [filterList]);

    const validate = () => {
        const newErrors = {};
        if (!filterSetId) newErrors.filterSetId = 'Filter Set is required';
        if (!filterTypeId) newErrors.filterTypeId = 'Filter Type is required';
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
                await dispatch(editFilterList({
                    id: filterList.id,
                    label: field.label,
                    priority: Number(field.priority),
                    status: status,
                    filterSetId: parseInt(filterSetId)
                }));
            }
            onClose();
            setFormFields([{ label: '', priority: 1 }]);
            setFilterSetId('');
            setFilterTypeId('');
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
                            <h5 className="modal-title">Edit Filter List</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Filter Type <span className="text-danger">*</span></label>
                                <select
                                    className={`form-control ${errors.filterTypeId ? 'is-invalid' : ''}`}
                                    value={filterTypeId}
                                    onChange={(e) => setFilterTypeId(e.target.value)}
                                >
                                    <option value="">-- Select Feature Type --</option>
                                    {filterTypes.map((fs) => (
                                        <option key={fs.id} value={fs.id}>{fs.name}</option>
                                    ))}
                                </select>
                                {errors.filterTypeId && (
                                    <div className="invalid-feedback">{errors.filterTypeId}</div>
                                )}
                            </div>
                            {/* Feature Set Dropdown */}
                            <div className="mb-3">
                                <label className="form-label">Filter Set <span className="text-danger">*</span></label>
                                <select
                                    className={`form-control ${errors.filterSetId ? 'is-invalid' : ''}`}
                                    value={filterSetId}
                                    onChange={(e) => setFilterSetId(e.target.value)}
                                >
                                    <option value="">-- Select Filter Set --</option>
                                    {filterSets.map((fs) => (
                                        <option key={fs.id} value={fs.id}>{fs.title}</option>
                                    ))}
                                </select>
                                {errors.filterSetId && (
                                    <div className="invalid-feedback">{errors.filterSetId}</div>
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

                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={status}
                                    onChange={() => setStatus(!status)}
                                    id="statusCheckbox"
                                />
                                <label className="form-check-label" htmlFor="statusCheckbox">
                                    <span className={status ? 'text-success' : 'text-danger'}>
                                        {status ? 'Active' : 'Inactive'}
                                    </span>
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

export default EditFilterListModal;
