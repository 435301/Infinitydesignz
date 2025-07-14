import React, { useState } from 'react';
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';

const CreateCoupon = () => {
  const [couponType, setCouponType] = useState('listsubmenu');

  const handleCouponTypeChange = (e) => {
    setCouponType(e.target.value);
  };

  // Sample data for select options (replace with API data if needed)
  const menuOptions = ['--Choose Menu--'];
  const submenuOptions = ['--Choose Sub Menu--'];
  const listSubmenuOptions = ['--Choose List Sub Menu--'];
  const priceOptions = [
    { value: '', label: 'Select Price' },
    { value: '<100', label: 'Upto 100' },
    { value: '100-500', label: '100-500' },
    { value: '500-1000', label: '500-1000' },
    { value: '1000-5000', label: '1000-5000' },
    { value: '5000-10000', label: '5000-10000' },
    { value: '>10000', label: 'Above 10000' },
  ];

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>
        <div className="content-wrapper p-4">
          <div className="container-fluid">
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h5 className="text-dark mb-0">Select Coupon Type</h5>
                    <a href="/admin/offers" className="btn btn-primary btn-sm">Manage</a>
                  </div>
                  <div className="card-block">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log('Form submitted:', e.target.elements);
                      }}
                    >
                      <div className="form-group">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="coupon_type"
                            value="listsubmenu"
                            checked={couponType === 'listsubmenu'}
                            onChange={handleCouponTypeChange}
                          />
                          <label className="form-check-label">List Submenu</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="coupon_type"
                            value="brand"
                            checked={couponType === 'brand'}
                            onChange={handleCouponTypeChange}
                          />
                          <label className="form-check-label">Brand</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="coupon_type"
                            value="url"
                            checked={couponType === 'url'}
                            onChange={handleCouponTypeChange}
                          />
                          <label className="form-check-label">URL</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="coupon_type"
                            value="price"
                            checked={couponType === 'price'}
                            onChange={handleCouponTypeChange}
                          />
                          <label className="form-check-label">Price</label>
                        </div>
                      </div>

                      {/* List Submenu Tab */}
                      <div className={`coupon-tab ${couponType !== 'listsubmenu' ? 'd-none' : ''}`}>
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-lg-12">
                              <h6 className="mb-4 text-info">Select List Submenu</h6>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="menu">
                                Menu <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="menu" name="menu">
                                {menuOptions.map((option, index) => (
                                  <option key={index}>{option}</option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="submenu">
                                Sub Menu <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="submenu" name="submenu">
                                {submenuOptions.map((option, index) => (
                                  <option key={index}>{option}</option>
                                ))}
                              </select>
                              <a href="#" className="float-end mt-1" style={{ fontSize: '10px' }}>
                                Create Sub Menu
                              </a>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="listsubmenu">
                                List Sub Menu <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control"
                                id="listsubmenu"
                                name="listsubmenu[]"
                                multiple
                                size="4"
                              >
                                {listSubmenuOptions.map((option, index) => (
                                  <option key={index}>{option}</option>
                                ))}
                              </select>
                              <a href="#" className="mt-1 d-block text-end" style={{ fontSize: '10px' }}>
                                Create List Sub Menu
                              </a>
                            </div>
                          </div>
                          <hr />
                          <h6 className="mb-4 text-info">Coupon Related Details Section</h6>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label htmlFor="coupon_code">
                                Coupon Code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="coupon_code"
                                name="coupon_code"
                                placeholder="Enter coupon code"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="price_type">
                                Price/Percentage <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="price_type" name="price_type">
                                <option>--Choose--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="value">
                                Value <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="value"
                                name="value"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="from_date">
                                From Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="from_date"
                                name="from_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="to_date">
                                To Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="to_date"
                                name="to_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="min_price">
                                Min Order Price <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="min_price"
                                name="min_price"
                                placeholder="Enter minimum price of purchase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Brand Tab */}
                      <div className={`coupon-tab ${couponType !== 'brand' ? 'd-none' : ''}`}>
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-lg-12">
                              <h6 className="mb-4 text-info">Select Brand</h6>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="menu">
                                Menu <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="menu" name="menu">
                                {menuOptions.map((option, index) => (
                                  <option key={index}>{option}</option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="submenu">
                                Sub Menu <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="submenu" name="submenu">
                                {submenuOptions.map((option, index) => (
                                  <option key={index}>{option}</option>
                                ))}
                              </select>
                              <a href="#" className="float-end mt-1" style={{ fontSize: '10px' }}>
                                Create Sub Menu
                              </a>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="listsubmenu">
                                List Sub Menu <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control"
                                id="listsubmenu"
                                name="listsubmenu[]"
                                multiple
                                size="4"
                              >
                                {listSubmenuOptions.map((option, index) => (
                                  <option key={index}>{option}</option>
                                ))}
                              </select>
                              <a href="#" className="mt-1 d-block text-end" style={{ fontSize: '10px' }}>
                                Create List Sub Menu
                              </a>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="brand">
                                Brand <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control"
                                id="brand"
                                name="brand[]"
                                multiple
                                size="4"
                              >
                                {listSubmenuOptions.map((option, index) => (
                                  <option key={index}>{option}</option>
                                ))}
                              </select>
                              <a href="#" className="mt-1 d-block text-end" style={{ fontSize: '10px' }}>
                                Create Brand
                              </a>
                            </div>
                          </div>
                          <hr />
                          <h6 className="mb-4 text-info">Coupon Related Details Section</h6>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label htmlFor="coupon_code">
                                Coupon Code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="coupon_code"
                                name="coupon_code"
                                placeholder="Enter coupon code"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="price_type">
                                Price/Percentage <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="price_type" name="price_type">
                                <option>--Choose--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="value">
                                Value <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="value"
                                name="value"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="from_date">
                                From Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="from_date"
                                name="from_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="to_date">
                                To Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="to_date"
                                name="to_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="min_price">
                                Min Order Price <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="min_price"
                                name="min_price"
                                placeholder="Enter minimum price of purchase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* URL Tab */}
                      <div className={`coupon-tab ${couponType !== 'url' ? 'd-none' : ''}`}>
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-lg-12">
                              <h6 className="mb-4 text-info">Select URL</h6>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="url">
                                URL <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="url"
                                name="url"
                                placeholder="Enter URL"
                              />
                            </div>
                          </div>
                          <hr />
                          <h6 className="mb-4 text-info">Coupon Related Details Section</h6>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label htmlFor="coupon_code">
                                Coupon Code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="coupon_code"
                                name="coupon_code"
                                placeholder="Enter coupon code"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="price_type">
                                Price/Percentage <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="price_type" name="price_type">
                                <option>--Choose--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="value">
                                Value <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="value"
                                name="value"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="from_date">
                                From Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="from_date"
                                name="from_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="to_date">
                                To Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="to_date"
                                name="to_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="min_price">
                                Min Order Price <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="min_price"
                                name="min_price"
                                placeholder="Enter minimum price of purchase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price Tab */}
                      <div className={`coupon-tab ${couponType !== 'price' ? 'd-none' : ''}`}>
                        <div className="container mt-4">
                          <div className="row">
                            <div className="col-lg-12">
                              <h6 className="mb-4 text-info">Select Price</h6>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="price_type">
                                Choose Price <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="price_type" name="price_type">
                                {priceOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <hr />
                          <h6 className="mb-4 text-info">Coupon Related Details Section</h6>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label htmlFor="coupon_code">
                                Coupon Code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="coupon_code"
                                name="coupon_code"
                                placeholder="Enter coupon code"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="price_type">
                                Price/Percentage <span className="text-danger">*</span>
                              </label>
                              <select className="form-control" id="price_type" name="price_type">
                                <option>--Choose--</option>
                              </select>
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="value">
                                Value <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="value"
                                name="value"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="from_date">
                                From Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="from_date"
                                name="from_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="to_date">
                                To Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="to_date"
                                name="to_date"
                                defaultValue="2025-07-12"
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label htmlFor="min_price">
                                Min Order Price <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="min_price"
                                name="min_price"
                                placeholder="Enter minimum price of purchase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Seller Tab (Placeholder) */}
                      <div className={`coupon-tab ${couponType !== 'seller' ? 'd-none' : ''}`}>
                        Seller Fields...
                      </div>

                      <div className="form-group text-center mt-4">
                        <button type="reset" className="btn btn-danger me-2">
                          Reset
                        </button>
                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;

// Inline styles from the original HTML
const styles = `
  .coupon-tab {
    margin-top: 15px;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .form-check-label {
    padding-left: 0;
    margin-bottom: 0;
    cursor: pointer;
  }
  .d-none {
    display: none !important;
  }
`;