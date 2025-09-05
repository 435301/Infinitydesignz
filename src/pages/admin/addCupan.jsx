import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';

const CreateCoupon = () => {
  const [formData, setFormData] = useState({
    couponType: 'list-submenu',
    menu: '',
    subMenu: '',
    listSubMenu: '',
    couponCode: '',
    pricePercentage: '',
    value: '',
    fromDate: '2025-05-23',
    toDate: '2025-05-23',
    minOrderPrice: '',
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // TODO: Send formData to backend
  };

  const handleReset = () => {
    setFormData({
      couponType: 'list-submenu',
      menu: '',
      subMenu: '',
      listSubMenu: '',
      couponCode: '',
      pricePercentage: '',
      value: '',
      fromDate: '2025-05-23',
      toDate: '2025-05-23',
      minOrderPrice: '',
    });
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar  isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)}/>
        </aside>

        <div className="content-wrapper p-4">
          <div className="main-header mt-0">
            <h5>Create Coupon</h5>
          </div>
          <div className="container-fluid manage">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-block py-3">
                    <form className="app-form mt-3" onSubmit={handleSubmit}>
                      <h5 className="mb-3">Select Coupon Type</h5>
                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <label className="form-label">Coupon Type</label>
                          <div className="d-flex gap-4 align-items-center flex-wrap">
                            {['list-submenu', 'url', 'price'].map((type) => (
                              <div key={type}>
                                <input
                                  type="radio"
                                  id={type}
                                  name="couponType"
                                  value={type}
                                  checked={formData.couponType === type}
                                  onChange={handleChange}
                                />
                                <label htmlFor={type} className="ms-1 text-capitalize">{type.replace('-', ' ')}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <h5 className="mb-3">Select List Submenu</h5>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 mb-3">
                          <label htmlFor="menu" className="form-label">Menu <span className="text-danger">*</span></label>
                          <select id="menu" name="menu" className="form-control" value={formData.menu} onChange={handleChange} required>
                            <option value="">--Choose Menu--</option>
                          </select>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-3">
                          <label htmlFor="subMenu" className="form-label">Sub Menu <span className="text-danger">*</span></label>
                          <select id="subMenu" name="subMenu" className="form-control" value={formData.subMenu} onChange={handleChange} required>
                            <option value="">--Choose Sub Menu--</option>
                          </select>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-3">
                          <label htmlFor="listSubMenu" className="form-label">
                            List Sub Menu <span className="text-danger">*</span>
                            <small><a href="#" className="ms-2">Create List Sub Menu</a></small>
                          </label>
                          <select id="listSubMenu" name="listSubMenu" className="form-control" value={formData.listSubMenu} onChange={handleChange} required>
                            <option value="">--Choose List Sub Menu--</option>
                          </select>
                        </div>
                      </div>

                      <h5 className="mb-3">Coupon Details</h5>
                      <div className="row">
                        <div className="col-lg-6 mb-3">
                          <label htmlFor="couponCode" className="form-label">Coupon Code <span className="text-danger">*</span></label>
                          <input type="text" id="couponCode" name="couponCode" className="form-control" placeholder="Enter coupon code" value={formData.couponCode} onChange={handleChange} required />
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label htmlFor="pricePercentage" className="form-label">Price/Percentage <span className="text-danger">*</span></label>
                          <select id="pricePercentage" name="pricePercentage" className="form-control" value={formData.pricePercentage} onChange={handleChange} required>
                            <option value="">--Choose--</option>
                            <option value="price">Price</option>
                            <option value="percentage">Percentage</option>
                          </select>
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label htmlFor="value" className="form-label">Value <span className="text-danger">*</span></label>
                          <input type="text" id="value" name="value" className="form-control" value={formData.value} onChange={handleChange} required />
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label htmlFor="fromDate" className="form-label">From Date <span className="text-danger">*</span></label>
                          <input type="date" id="fromDate" name="fromDate" className="form-control" value={formData.fromDate} onChange={handleChange} required />
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label htmlFor="toDate" className="form-label">To Date <span className="text-danger">*</span></label>
                          <input type="date" id="toDate" name="toDate" className="form-control" value={formData.toDate} onChange={handleChange} required />
                        </div>

                        <div className="col-lg-6 mb-3">
                          <label htmlFor="minOrderPrice" className="form-label">Min Order Price <span className="text-danger">*</span></label>
                          <input type="text" id="minOrderPrice" name="minOrderPrice" className="form-control" placeholder="Enter minimum order price" value={formData.minOrderPrice} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <button type="submit" className="btn btn-primary px-5 me-2">Submit</button>
                          <button type="button" onClick={handleReset} className="btn btn-outline-secondary px-5">Reset</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default CreateCoupon;
