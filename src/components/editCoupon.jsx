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
  const [status, setStatus] = useState(false);

    useEffect(() => {
        dispatch(fetchBrands());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (coupon) {
            setCouponType(coupon.type?.toLowerCase() || '');
            setSelectedMenu(coupon.menuId?.toString() || '');
            setSelectedSubMenu(coupon.subMenuId?.toString() || '');
            setSelectedListSubMenu(coupon.listSubMenuId?.toString() || '');
            setFormValues({
                code: coupon.code,
                priceType: coupon.priceType,
                value: coupon.value,
                minOrderAmount: coupon.minOrderAmount,
                fromDate: coupon.fromDate?.slice(0, 10),
                toDate: coupon.toDate?.slice(0, 10),
                url: coupon.url || '',
                priceRange: coupon.priceRange || '',
                brandId: coupon.brandId?.toString() || '',
            });
             setStatus(coupon.status ?? false);
        }
    }, [coupon]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
                        <label className="fw-bold">Coupon Type</label>
                        <input type="text" className="form-control" value={couponType} disabled />
                    </div>

                    {(couponType === 'list_submenu' || couponType === 'brand') && (
                        <div className="row">
                            <div className="col-md-4">
                                <label>Menu</label>
                                <select value={selectedMenu} onChange={(e) => setSelectedMenu(e.target.value)} className="form-control">
                                    <option value="">-- Choose Menu --</option>
                                    {menuOptions.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label>Sub Menu</label>
                                <select value={selectedSubMenu} onChange={(e) => setSelectedSubMenu(e.target.value)} className="form-control">
                                    <option value="">-- Choose Sub Menu --</option>
                                    {subMenuOptions.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label>List Sub Menu</label>
                                <select value={selectedListSubMenu} onChange={(e) => setSelectedListSubMenu(e.target.value)} className="form-control">
                                    <option value="">-- Choose List Sub Menu --</option>
                                    {listSubMenuOptions.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {couponType === 'brand' && (
                        <div className="form-group mt-3">
                            <label>Brand</label>
                            <select name="brandId" value={formValues.brandId} onChange={handleChange} className="form-control">
                                <option value="">--Choose Brand--</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {couponType === 'url' && (
                        <div className="form-group mt-3">
                            <label>URL</label>
                            <input type="text" name="url" value={formValues.url} onChange={handleChange} className="form-control" />
                        </div>
                    )}

                    {couponType === 'price' && (
                        <div className="form-group mt-3">
                            <label>Price Range</label>
                            <input type="text" name="priceRange" value={formValues.priceRange} onChange={handleChange} className="form-control" />
                        </div>
                    )}

                    <hr />
                    <h6 className="text-info mb-3">Coupon Details</h6>
                    <div className="row">
                        <div className="form-group col-md-4">
                            <label>Coupon Code</label>
                            <input name="code" value={formValues.code} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Price Type</label>
                            <select name="priceType" value={formValues.priceType} onChange={handleChange} className="form-control">
                                <option value="">-- Choose --</option>
                                <option value="FIXED">Fixed</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Value</label>
                            <input name="value" value={formValues.value} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>From Date</label>
                            <input type="date" name="fromDate" value={formValues.fromDate} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>To Date</label>
                            <input type="date" name="toDate" value={formValues.toDate} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Min Order Amount</label>
                            <input name="minOrderAmount" value={formValues.minOrderAmount} onChange={handleChange} className="form-control" />
                        </div>
                         <div className="form-group col-md-4">
                            <label>Status</label>
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
