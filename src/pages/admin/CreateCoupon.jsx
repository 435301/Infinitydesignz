import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../redux/actions/couponAction';
import { fetchBrands } from '../../redux/actions/brandAction';
import { fetchCategories } from '../../redux/actions/categoryAction';
import { fetchPrice } from '../../redux/actions/priceAction';

const CreateCouponModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.categories || {});
  const { brands = [] } = useSelector((state) => state.brands);
  const [couponType, setCouponType] = useState('list_submenu');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedSubMenu, setSelectedSubMenu] = useState('');
  const [selectedListSubMenu, setSelectedListSubMenu] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(false);

  const menuOptions = categories.filter((cat) => cat.parentId === null);
  const subMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedMenu));
  const listSubMenuOptions = categories.filter((cat) => cat.parentId === parseInt(selectedSubMenu));

  const priceOptions = useSelector((state) => state.prices.prices);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchPrice());
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let newErrors = {};
    // Validate common fields
    if (!form.coupon_code?.value.trim()) newErrors.coupon_code = "Coupon Code is required";
    if (!form.price_type?.value || form.price_type.value === "--Choose--") newErrors.price_type = "Price/Percentage is required";
    const value = parseFloat(form.value?.value);
    if (!form.value?.value.trim()) {
      newErrors.value = "Value is required";
    } else if (isNaN(value) || value <= 0) {
      newErrors.value = "Value must be greater than 0";
    }
    if (!form.fromDate?.value) newErrors.fromDate = "From Date is required";
    if (!form.toDate?.value) newErrors.toDate = "To Date is required";
    const minPrice = parseFloat(form.min_price?.value);
    if (couponType !== "price") {
    if (!form.min_price?.value.trim()) {
      newErrors.min_price = "Minimum Order Price is required";
    } else if (isNaN(minPrice) || minPrice <= 0) {
      newErrors.min_price = "Minimum Order Price must be greater than 0";
    }
  }
    // Validate based on coupon type
    if (couponType === 'list_submenu' || couponType === 'brand') {
      if (!selectedMenu) newErrors.selectedMenu = "Menu is required";
      if (!selectedSubMenu) newErrors.selectedSubMenu = "Sub Menu is required";
      if (!selectedListSubMenu) newErrors.selectedListSubMenu = "List Sub Menu is required";
    }

    if (couponType === 'brand') {
      const selectedBrands = Array.from(form["brand[]"]?.selectedOptions || []).map(
        (opt) => parseInt(opt.value)
      );
      if (!selectedBrands.length) newErrors.brand = "Brand is required";
    }

    if (couponType === 'url' && !form.url?.value.trim()) {
      newErrors.url = "URL is required";
    }

    if (couponType === 'price' && !form.price_selection?.value) {
      newErrors.price_selection = "Price selection is required";
    }

    // If errors exist, stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      code: form.coupon_code?.value || '',
      type: couponType.toUpperCase(),
      priceType: form.price_type?.value.toUpperCase() || '',
      value: parseFloat(form.value?.value) || 0,
      minOrderAmount: parseFloat(form.min_price?.value) || 0,
      fromDate: form.fromDate?.value
        ? new Date(form.fromDate.value).toISOString()
        : null,
      toDate: form.toDate?.value
        ? new Date(form.toDate.value).toISOString()
        : null,
      status: status,
    };
    if (couponType === 'list_submenu' || couponType === 'brand') {
      payload.menuId = parseInt(selectedMenu);
      payload.subMenuId = parseInt(selectedSubMenu);
      payload.listSubMenuId = parseInt(selectedListSubMenu);
    }

    if (couponType === 'brand') {
      const selectedBrands = Array.from(form["brand[]"]?.selectedOptions || []).map(
        (opt) => parseInt(opt.value)
      );
      if (selectedBrands.length) {
        payload.brandId = selectedBrands[0];
      }
    }
    if (couponType === 'url') {
      payload.url = form.url?.value || '';
    }
    if (couponType === 'price') {
      payload.priceRangeId = parseInt(form.price_selection?.value) || null;
    }

    dispatch(addCoupon(payload));
    onHide();
  };

  const renderCouponDetailsSection = () => (
    <>
      <hr />
      <h6 className="mb-3 text-info">Coupon Related Details Section</h6>
      <div className="row">
        <div className="form-group col-md-4">
          <label>Coupon Code <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.coupon_code ? 'is-invalid' : ''}`} name="coupon_code" onChange={handleInputChange} />
          {errors.coupon_code && <div className="invalid-feedback">{errors.coupon_code}</div>}
        </div>
        <div className="form-group col-md-4">
          <label>Price/Percentage <span className="text-danger">*</span></label>
          <select className={`form-control ${errors.price_type ? 'is-invalid' : ''}`} name="price_type" onChange={handleInputChange}>
            <option>--Choose--</option>
            <option value='fixed'>Price</option>
            <option value="percentage">Percentage</option>
          </select>
          {errors.price_type && <div className="invalid-feedback">{errors.price_type}</div>}
        </div>
        <div className="form-group col-md-4">
          <label>Value <span className="text-danger">*</span></label>
          <input type="text" className={`form-control ${errors.value ? 'is-invalid' : ''}`} name="value" onChange={handleInputChange} />
          {errors.value && <div className="invalid-feedback">{errors.value}</div>}
        </div>

        <div className="form-group col-md-4">
          <label>From Date <span className="text-danger">*</span></label>
          <input type="date" className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`} name="fromDate" onChange={handleInputChange} min={new Date().toISOString().split("T")[0]} />
          {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}

        </div>
        <div className="form-group col-md-4">
          <label>To Date <span className="text-danger">*</span></label>
          <input type="date" className={`form-control ${errors.toDate ? 'is-invalid' : ''}`} name="toDate" onChange={handleInputChange} min={new Date().toISOString().split("T")[0]} />
          {errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}
        </div>

        {couponType !== 'price' && (
          <div className="form-group col-md-4">
            <label>Min Order Price <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.min_price ? 'is-invalid' : ''}`} name="min_price" placeholder="Enter minimum price of purchase" onChange={handleInputChange} min="1" />
            {errors.min_price && <div className="invalid-feedback">{errors.min_price}</div>}
          </div>
        )}
      </div>
    </>
  );

  return (
    <Modal show={show} onHide={onHide} size="xl" backdrop="static" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Create Coupon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fw-bold mb-2 pe-3">Select Coupon Type</label>
            {['list_submenu', 'brand', 'url', 'price'].map((type) => (
              <div key={type} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="coupon_type"
                  value={type}
                  checked={couponType === type}
                  onChange={(e) => setCouponType(e.target.value)}
                />
                <label className="form-check-label text-capitalize">{type}</label>
              </div>
            ))}
          </div>

          {/* List Submenu */}
          {couponType === 'list_submenu' && (
            <>
              <h6 className="mb-3 text-info">Select List Submenu</h6>
              <div className="row">

                <div className="col-lg-4 mb-3">
                  <label className="form-label">
                    Menu<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.selectedMenu ? 'is-invalid' : ''}`}
                    value={selectedMenu}
                    onChange={(e) => {
                      setSelectedMenu(e.target.value);
                      setSelectedSubMenu('');
                      setSelectedListSubMenu('');
                      if (errors.selectedMenu) {
                        setErrors({ ...errors, selectedMenu: '' });
                      }
                    }}
                  >
                    <option value="">--Choose Menu--</option>
                    {menuOptions.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedMenu && (
                    <div className="invalid-feedback">{errors.selectedMenu}</div>
                  )}
                </div>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">
                    Sub Menu<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.selectedSubMenu ? 'is-invalid' : ''}`}
                    value={selectedSubMenu}
                    onChange={(e) => {
                      setSelectedSubMenu(e.target.value);
                      setSelectedListSubMenu('');
                      if (errors.selectedSubMenu) {
                        setErrors({ ...errors, selectedSubMenu: '' });
                      }
                    }}
                  >
                    <option value="">--Choose Sub Menu--</option>
                    {subMenuOptions.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedSubMenu && (
                    <div className="invalid-feedback">{errors.selectedSubMenu}</div>
                  )}
                </div>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">
                    List Sub Menu<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.selectedListSubMenu ? 'is-invalid' : ''}`}
                    value={selectedListSubMenu}
                    onChange={(e) => {
                      setSelectedListSubMenu(e.target.value);
                      if (errors.selectedListSubMenu) {
                        setErrors({ ...errors, selectedListSubMenu: '' });
                      }
                    }}
                  >
                    <option value="">--Choose List Sub Menu--</option>
                    {listSubMenuOptions.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedListSubMenu && (
                    <div className="invalid-feedback">{errors.selectedListSubMenu}</div>
                  )}
                </div>
              </div>
              {renderCouponDetailsSection()}
            </>
          )}

          {/* Brand */}
          {couponType === 'brand' && (
            <>
              <h6 className="mb-3 text-info">Select Brand</h6>
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <label className="form-label">
                    Menu<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.selectedMenu ? 'is-invalid' : ''}`}
                    value={selectedMenu}
                    onChange={(e) => {
                      setSelectedMenu(e.target.value);
                      setSelectedSubMenu('');
                      setSelectedListSubMenu('');
                      if (errors.selectedMenu) {
                        setErrors({ ...errors, selectedMenu: '' });
                      }
                    }}
                  >
                    <option value="">--Choose Menu--</option>
                    {menuOptions.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedMenu && (
                    <div className="invalid-feedback">{errors.selectedMenu}</div>
                  )}
                </div>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">
                    Sub Menu<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.selectedSubMenu ? 'is-invalid' : ''}`}
                    value={selectedSubMenu}
                    onChange={(e) => {
                      setSelectedSubMenu(e.target.value);
                      setSelectedListSubMenu('');
                      if (errors.selectedSubMenu) {
                        setErrors({ ...errors, selectedSubMenu: '' });
                      }
                    }}
                  >
                    <option value="">--Choose Sub Menu--</option>
                    {subMenuOptions.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedSubMenu && (
                    <div className="invalid-feedback">{errors.selectedSubMenu}</div>
                  )}
                </div>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">
                    List Sub Menu<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.selectedListSubMenu ? 'is-invalid' : ''}`}
                    value={selectedListSubMenu}
                    onChange={(e) => {
                      setSelectedListSubMenu(e.target.value);
                      if (errors.selectedListSubMenu) {
                        setErrors({ ...errors, selectedListSubMenu: '' });
                      }
                    }}
                  >
                    <option value="">--Choose List Sub Menu--</option>
                    {listSubMenuOptions.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedListSubMenu && (
                    <div className="invalid-feedback">{errors.selectedListSubMenu}</div>
                  )}
                </div>
                <div className="form-group col-md-4">
                  <label>Brand</label>
                  <select className={`form-control ${errors.brand ? 'is-invalid' : ''}`} name="brand[]" onChange={handleInputChange}>
                    <option value="">--Choose Brand--</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                  {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
                </div>
              </div>
              {renderCouponDetailsSection()}
            </>
          )}

          {/* URL */}
          {couponType === 'url' && (
            <>
              <h6 className="mb-3 text-info">Select URL</h6>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>URL<span className='text-danger'>*</span></label>
                  <input type="text" className={`form-control ${errors.url ? 'is-invalid' : ''}`} name="url" placeholder="Enter URL" onChange={handleInputChange} />
                  {errors.url && <div className="invalid-feedback">{errors.url}</div>}
                </div>
              </div>
              {renderCouponDetailsSection()}
            </>
          )}

          {/* Price */}
          {couponType === 'price' && (
            <>
              <h6 className="mb-3 text-info">Select Price</h6>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Choose Price<span className='text-danger'>*</span></label>
                  <select className={`form-control ${errors.price_selection ? 'is-invalid' : ''}`} name="price_selection" onChange={handleInputChange}>
                    {priceOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                  {errors.price_selection && <div className="invalid-feedback">{errors.price_selection}</div>}
                </div>
              </div>
              {renderCouponDetailsSection()}
            </>
          )}

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
          </div>
          <div className="text-center mt-4">
            <Button variant="secondary" onClick={onHide} className="me-2">Cancel</Button>
            <Button type="submit" variant="success">Submit</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCouponModal;
