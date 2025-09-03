import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { fetchFilterTypes } from '../redux/actions/filterTypeAction';
import { addFilterSet, editFilterSet } from '../redux/actions/filterSetAction';

const EditFilterSetModal = ({ show, onClose, filterSet }) => {
    const dispatch = useDispatch();
    const { filterTypes = [] } = useSelector((state) => state.filterTypes || {});
    const [filterTypesInput, setFilterTypesInput] = useState([{ title: '', priority: '' }]);
    const [selectedFilterTypeId, setSelectedFilterTypeId] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(true);


    useEffect(() => {
        dispatch(fetchFilterTypes());
    }, [dispatch]);

    useEffect(() => {
        if (filterSet) {
            const initialInput = [{
                title: filterSet?.title || '',
                priority: filterSet?.priority || ''
            }];

            if (Array.isArray(initialInput)) {
                setFilterTypesInput(initialInput);
            } else {
                setFilterTypesInput([{ title: filterSet?.title || '', priority: filterSet?.priority || '' }]);
            }

            setSelectedFilterTypeId(
                filterSet?.filterType?.id?.toString() || ''
            );
            setStatus(filterSet.status ?? true);
        }
    }, [filterSet, show]);

    const validate = () => {
        const newErrors = {};

        if (!selectedFilterTypeId) {
            newErrors.menu = 'Filter Type is required';
        }

        filterTypesInput.forEach((field, index) => {
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
        const updated = [...filterTypesInput];
        updated[index][field] = value;
        setFilterTypesInput(updated);

        const errorKey = `${field}-${index}`;
        if (errors[errorKey]) {
            const updatedErrors = { ...errors };
            delete updatedErrors[errorKey];
            setErrors(updatedErrors);
        }
    };

    const handleFilterSetChange = (e) => {
        setSelectedFilterTypeId(e.target.value);
        if (errors.menu) {
            const updatedErrors = { ...errors };
            delete updatedErrors.menu;
            setErrors(updatedErrors);
        }
    };

    const handleAddField = () => {
        setFilterTypesInput([...filterTypesInput, { title: '' }]);
    };

    const handleRemoveField = (index) => {
        const updated = filterTypesInput.filter((_, i) => i !== index);
        setFilterTypesInput(updated);

        const updatedErrors = { ...errors };
        delete updatedErrors[`title-${index}`];
        setErrors(updatedErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            for (let item of filterTypesInput) {
                const payload = {
                    id: filterSet.id,
                    title: item.title,
                    filterTypeId: Number(selectedFilterTypeId),
                    priority: Number(item.priority),
                    status: status,

                }
                console.log('Payload being sent:', payload);
                await dispatch(editFilterSet(payload));
            }
            onClose();
            setFilterTypesInput([{ title: '', priority: '' }]);
            setSelectedFilterTypeId('');
        } catch (err) {
            setErrors({
                general: err?.response?.data?.message || 'Something went wrong.',
            });
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block new-1" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Filter Set</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">
                                    Filter Set <span className="text-danger">*</span>
                                </label>
                                <select
                                    className={`form-control ${errors.menu ? 'is-invalid' : ''}`}
                                    value={selectedFilterTypeId}
                                    onChange={handleFilterSetChange}
                                >
                                    <option value="">-- Select Filter Type --</option>
                                    {filterTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.menu && <div className="invalid-feedback">{errors.menu}</div>}
                            </div>

                            {filterTypesInput.map((field, index) => (
                                <div className="mb-3 d-flex align-items-start gap-2" key={index}>
                                    <div className="flex-fill">
                                        <input
                                            className={`form-control mb-1 ${errors[`title-${index}`] ? 'is-invalid' : ''}`}
                                            type="text"
                                            placeholder="Title"
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
                                        {filterTypesInput.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger mb-1"
                                                onClick={() => handleRemoveField(index)}
                                            >
                                                <BsDashCircle />
                                            </button>
                                        )}
                                        {index === filterTypesInput.length - 1 && (
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
                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="statusCheckbox"
                                    checked={status}
                                    onChange={() => setStatus(!status)}
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

export default EditFilterSetModal;
