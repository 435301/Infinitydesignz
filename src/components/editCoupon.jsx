import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../redux/actions/brandAction';
import { fetchCategories } from '../redux/actions/categoryAction';
import { editCoupon } from '../redux/actions/couponAction';

const EditCouponModal = ({ show, onHide, coupon }) => {
    console.log('id', coupon.id);
    const dispatch = useDispatch();
    const { categories = [] } = useSelector((state) => state.categories || {});
    const { brands = [] } = useSelector((state) => state.brands || {});
    const [couponType, setCouponType] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedSubMenu, setSelectedSubMenu] = useState('');
    const [selectedListSubMenu, setSelectedListSubMenu] = useState('');
    const [formValues, setFormValues] = useState({});
    console.log('formValues', formValues)
    const [status, setStatus] = useState(false);
    const [errors, setErrors] = useState({});

    const priceOptions = [
        { value: '', label: 'Select Price' },
        { value: '<100', label: 'Upto 100' },
        { value: '100-500', label: '100-500' },
        { value: '500-1000', label: '500-1000' },
        { value: '1000-5000', label: '1000-5000' },
        { value: '5000-10000', label: '5000-10000' },
        { value: '>10000', label: 'Above 10000' },
    ];

    useEffect(() => {
        dispatch(fetchBrands());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (show && coupon) {
            setCouponType(coupon.type?.toLowerCase() || '');
            setSelectedMenu(coupon.menuId?.toString() || '');
            setSelectedSubMenu(coupon.subMenuId?.toString() || '');
            setSelectedListSubMenu(coupon.listSubMenuId?.toString() || '');
            setFormValues({
                code: coupon.code,
                  priceType: coupon.priceType?.toLowerCase() || '', 
                value: coupon.value,
                minOrderAmount: coupon.minOrderAmount,
                fromDate: coupon.fromDate?.slice(0, 10),
                toDate: coupon.toDate?.slice(0, 10),
                url: coupon.url || '',
                priceRange: coupon.priceRange?.toString() || '',
                brandId: coupon.brandId?.toString() || '',
            });
            setStatus(coupon.status ?? false);
            setErrors({});
        }
    }, [show, coupon]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        // Validate common fields
        if (!formValues.code?.trim()) newErrors.code = "Coupon Code is required";
        if (!formValues.priceType || formValues.priceType === "--Choose--")
            newErrors.priceType = "Price/Percentage is required";

        const value = parseFloat(formValues.value);
        if (!formValues.value?.toString().trim()) {
            newErrors.value = "Value is required";
        } else if (isNaN(value) || value <= 0) {
            newErrors.value = "Value must be greater than 0";
        }

        if (!formValues.fromDate) newErrors.fromDate = "From Date is required";
        if (!formValues.toDate) newErrors.toDate = "To Date is required";

        const minPrice = parseFloat(formValues.minOrderAmount);
        if (!formValues.minOrderAmount?.toString().trim()) {
            newErrors.minOrderAmount = "Minimum Order Price is required";
        } else if (isNaN(minPrice) || minPrice <= 0) {
            newErrors.minOrderAmount = "Minimum Order Price must be greater than 0";
        }

        // Validate based on coupon type
        if (couponType === "list_submenu" || couponType === "brand") {
            if (!selectedMenu) newErrors.selectedMenu = "Menu is required";
            if (!selectedSubMenu) newErrors.selectedSubMenu = "Sub Menu is required";
            if (!selectedListSubMenu) newErrors.selectedListSubMenu = "List Sub Menu is required";
        }

        if (couponType === "brand" && !formValues.brandId) {
            newErrors.brandId = "Brand is required";
        }

        if (couponType === "url" && !formValues.url?.trim()) {
            newErrors.url = "URL is required";
        }

        if (couponType === "price" && !formValues.priceRange) {
            newErrors.priceRange = "Price range is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload = {
            id: coupon.id,
            code: formValues.code,
            type: couponType.toUpperCase(),
            priceType: formValues.priceType?.toUpperCase(),
            value: parseFloat(formValues.value),
            minOrderAmount: parseFloat(formValues.minOrderAmount),
            fromDate: new Date(formValues.fromDate).toISOString(),
            toDate: new Date(formValues.toDate).toISOString(),
            status: status,
        };

        if (couponType === 'list_submenu' || couponType === 'brand') {
            payload.menuId = parseInt(selectedMenu);
            payload.subMenuId = parseInt(selectedSubMenu);
            payload.listSubMenuId = parseInt(selectedListSubMenu);
        }

        if (couponType === 'brand') {
            payload.brandId = parseInt(formValues.brandId);
        }

        if (couponType === 'url') {
            payload.url = formValues.url;
        }

        if (couponType === 'price') {
            payload.priceRange = formValues.priceRange;
        }

        dispatch(editCoupon(payload));
        onHide();
    };

    const menuOptions = categories.filter((cat) => cat.parentId === null);
    const subMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedMenu));
    const listSubMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedSubMenu));

    return (
        <Modal show={show} onHide={onHide} size="xl" backdrop="static" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Edit Coupon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {/* Coupon Type (readonly during edit) */}
                    <div className="mb-3">
                        <label className="fw-bold">Coupon Type<span className='text-danger'>*</span></label>
                        <input type="text" className="form-control" value={couponType} disabled />
                    </div>

                    {(couponType === 'list_submenu' || couponType === 'brand') && (
                        <div className="row">
                            <div className="col-md-4">
                                <label>Menu<span className='text-danger'>*</span></label>
                                <select value={selectedMenu}
                                    onChange={(e) => {
                                        setSelectedMenu(e.target.value);
                                        setSelectedSubMenu('');
                                        setSelectedListSubMenu('');
                                        if (errors.selectedMenu) {
                                            setErrors({ ...errors, selectedMenu: '' });
                                        }
                                    }}
                                    className={`form-control ${errors.selectedMenu ? 'is-invalid' : ''}`}>
                                    <option value="">-- Choose Menu --</option>
                                    {menuOptions.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                                    ))}
                                </select>
                                {errors.selectedMenu && (
                                    <div className="invalid-feedback">{errors.selectedMenu}</div>
                                )}
                            </div>
                            <div className="col-md-4">
                                <label>Sub Menu<span className='text-danger'>*</span></label>
                                <select value={selectedSubMenu}
                                    onChange={(e) => {
                                        setSelectedSubMenu(e.target.value);
                                        setSelectedListSubMenu('');

                                        if (errors.selectedSubMenu) {
                                            setErrors({ ...errors, selectedSubMenu: '' });
                                        }
                                    }}
                                    className={`form-control ${errors.selectedSubMenu ? 'is-invalid' : ''}`}>
                                    <option value="">-- Choose Sub Menu --</option>
                                    {subMenuOptions.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                                    ))}
                                </select>
                                {errors.selectedSubMenu && (
                                    <div className="invalid-feedback">{errors.selectedSubMenu}</div>
                                )}
                            </div>
                            <div className="col-md-4">
                                <label>List Sub Menu<span className='text-danger'>*</span></label>
                                <select value={selectedListSubMenu}
                                    onChange={(e) => {
                                        setSelectedListSubMenu(e.target.value);
                                        if (errors.selectedListSubMenu) {
                                            setErrors({ ...errors, selectedListSubMenu: '' });
                                        }
                                    }}
                                    className={`form-control ${errors.selectedListSubMenu ? 'is-invalid' : ''}`}>
                                    <option value="">-- Choose List Sub Menu --</option>
                                    {listSubMenuOptions.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                                    ))}
                                </select>
                                {errors.selectedListSubMenu && (
                                    <div className="invalid-feedback">{errors.selectedListSubMenu}</div>
                                )}
                            </div>
                        </div>
                    )}

                    {couponType === 'brand' && (
                        <div className="form-group mt-3">
                            <label>Brand</label>
                            <select name="brandId" value={formValues.brandId} onChange={handleChange} className={`form-control ${errors.brand ? 'is-invalid' : ''}`}>
                                <option value="">--Choose Brand--</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                            {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
                        </div>
                    )}

                    {couponType === 'url' && (
                        <div className="form-group mt-3">
                            <label>URL<span className='text-danger'>*</span></label>
                            <input type="text" name="url" value={formValues.url} onChange={handleChange} className={`form-control ${errors.url ? 'is-invalid' : ''}`} />
                            {errors.url && <div className="invalid-feedback">{errors.url}</div>}
                        </div>
                    )}

                    {couponType === 'price' && (
                        <div className="form-group mt-3">
                            <label>Choose Price<span className='text-danger'>*</span></label>
                            <select
                                name="priceRange"
                                value={formValues.priceRange}
                                onChange={handleChange}
                                className={`form-control ${errors.priceRange ? 'is-invalid' : ''}`}
                            >
                                <option value="">-- Choose Price --</option>
                                {priceOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.priceRange && <div className="invalid-feedback">{errors.priceRange}</div>}
                        </div>
                    )}

                    <hr />
                    <h6 className="text-info mb-3">Coupon Details</h6>
                    <div className="row">
                        <div className="form-group col-md-4">
                            <label>Coupon Code<span className='text-danger'>*</span></label>
                            <input name="code" value={formValues.code} onChange={handleChange} className={`form-control ${errors.code ? 'is-invalid' : ''}`} />
                            {errors.code && <div className="invalid-feedback">{errors.code}</div>}

                        </div>
                        <div className="form-group col-md-4">
                            <label>Price/Percentage <span className="text-danger">*</span></label>
                            <select className={`form-control ${errors.priceType ? 'is-invalid' : ''}`} name="priceType" onChange={handleChange}  value={formValues.priceType}>
                                <option>--Choose--</option>
                                <option value='fixed'>Price</option>
                                <option value="percentage">Percentage</option>
                            </select>
                            {errors.priceType && <div className="invalid-feedback">{errors.priceType}</div>}
                        </div>

                        <div className="form-group col-md-4">
                            <label>Value<span className='text-danger'>*</span></label>
                            <input name="value" value={formValues.value} onChange={handleChange} className={`form-control ${errors.value ? 'is-invalid' : ''}`} />
                            {errors.value && <div className="invalid-feedback">{errors.value}</div>}

                        </div>
                        <div className="form-group col-md-4">
                            <label>From Date<span className='text-danger'>*</span></label>
                            <input type="date" name="fromDate" value={formValues.fromDate} onChange={handleChange} className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`} min={new Date().toISOString().split("T")[0]} />
                            {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}

                        </div>
                        <div className="form-group col-md-4">
                            <label>To Date<span className='text-danger'>*</span></label>
                            <input type="date" name="toDate" value={formValues.toDate} onChange={handleChange} className={`form-control ${errors.toDate ? 'is-invalid' : ''}`} min={new Date().toISOString().split("T")[0]} />
                            {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}

                        </div>
                        <div className="form-group col-md-4">
                            <label>Min Order Price<span className='text-danger'>*</span></label>
                            <input name="minOrderAmount" value={formValues.minOrderAmount} onChange={handleChange} className={`form-control ${errors.minOrderAmount ? 'is-invalid' : ''}`} min="1" />
                            {errors.minOrderAmount && <div className="invalid-feedback">{errors.minOrderAmount}</div>}

                        </div>
                        <div className="form-group col-md-4">
                            <label>Status<span className='text-danger'>*</span></label>
                            <select
                                className="form-control"
                                value={status ? "true" : "false"}
                                onChange={(e) => setStatus(e.target.value === "true")}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <Button variant="danger" onClick={onHide}>Close</Button>{' '}
                        <Button type="submit" variant="primary">Update</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditCouponModal;
