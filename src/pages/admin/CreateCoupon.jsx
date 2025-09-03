import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../redux/actions/couponAction';
import { fetchBrands } from '../../redux/actions/brandAction';
import { fetchCategories } from '../../redux/actions/categoryAction';

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
    dispatch(fetchCategories())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      code: form.coupon_code?.value || '',
      type: couponType.toUpperCase(),
      priceType: form.price_type?.value.toUpperCase() || '',
      value: parseFloat(form.value?.value) || 0,
      minOrderAmount: parseFloat(form.min_price?.value) || 0,
      fromDate: new Date(form.from_date?.value).toISOString(),
      toDate: new Date(form.to_date?.value).toISOString(),
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
      const selectedRange = form.price_selection?.value || '';
      const priceRangeIdMap = {
        '<100': 1,
        '100-500': 2,
        '500-1000': 3,
        '1000-5000': 4,
        '5000-10000': 5,
        '>10000': 6,
      };
      // payload.priceRange = selectedRange;
      payload.priceRangeId = priceRangeIdMap[selectedRange] || null;
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
          <input type="text" className="form-control" name="coupon_code" />
        </div>
        <div className="form-group col-md-4">
          <label>Price/Percentage <span className="text-danger">*</span></label>
          <select className="form-control" name="price_type">
            <option>--Choose--</option>
            <option value='fixed'>Price</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <label>Value <span className="text-danger">*</span></label>
          <input type="text" className="form-control" name="value" />
        </div>
        <div className="form-group col-md-4">
          <label>From Date <span className="text-danger">*</span></label>
          <input type="date" className="form-control" name="from_date" defaultValue="2025-07-12" />
        </div>
        <div className="form-group col-md-4">
          <label>To Date <span className="text-danger">*</span></label>
          <input type="date" className="form-control" name="to_date" defaultValue="2025-07-12" />
        </div>
        <div className="form-group col-md-4">
          <label>Min Order Price <span className="text-danger">*</span></label>
          <input type="text" className="form-control" name="min_price" placeholder="Enter minimum price of purchase" />
        </div>
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
            <label className="fw-bold mb-2">Select Coupon Type</label>
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
                  <select className="form-control" name="brand[]" >
                    <option value="">--Choose Brand--</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}

                  </select>
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
                  <label>URL</label>
                  <input type="text" className="form-control" name="url" placeholder="Enter URL" />
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
                  <label>Choose Price</label>
                  <select className="form-control" name="price_selection">
                    {priceOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
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
