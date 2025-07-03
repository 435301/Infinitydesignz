import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsPlus } from 'react-icons/bs';

const AddProduct = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [description, setDescription] = useState('');

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
    console.log('Form submitted');
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div
          className="content-wrapper py-3"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '301px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="section-nav mt-4 mb-3 d-flex gap-3">
            <a href="#" className="active">Add Product</a>
            <a href="#">Product Images</a>
            <a href="#">Product Filters</a>
            <a href="#">Product Features</a>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3">
                    <h5 className="text-dark mb-0">Create Product</h5>
                  </div>

                  <div className="card-block">
                    <form onSubmit={handleSubmit} className="app-form">
                      <div className="row">

                        {/* Category Details */}
                        <div className="col-lg-12">
                          <h6 className="sub-heading">Category Details</h6>
                          <div className="row">
                            {['Menu', 'Sub Menu', 'List Sub Menu'].map((label, index) => (
                              <div className="col-lg-4 mb-3" key={index}>
                                <label className="form-label">{label} <span className="text-danger">*</span></label>
                                <select className="form-control">
                                  <option value="">--Choose {label}--</option>
                                </select>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-lg-12 section-divider"></div>

                        {/* Product Details */}
                        <div className="col-lg-12">
                          <h6 className="sub-heading">Product Details</h6>
                          <div className="row">
                            {[
                              { id: 'sku_code', label: 'SKU Code' },
                              { id: 'title', label: 'Title' },
                              { id: 'weight', label: 'Weight (gms)' },
                              { id: 'model', label: 'Model' },
                              { id: 'sla', label: 'SLA (Delivery Days)' },
                              { id: 'delivery_charges', label: 'Delivery Charges' },
                            ].map((field, idx) => (
                              <div className="col-lg-4 mb-3" key={idx}>
                                <label htmlFor={field.id} className="form-label">
                                  {field.label} <span className="text-danger">*</span>
                                </label>
                                <input id={field.id} className="form-control" placeholder={field.label} type="text" />
                              </div>
                            ))}

                            <div className="col-lg-12 mb-3">
                              <label className="form-label">Description</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setDescription(data);
                                }}
                              />
                            </div>

                            <div className="col-lg-6 mb-3">
                              <label className="form-label">Product Status <span className="text-danger">*</span></label>
                              <select className="form-control">
                                <option value="enable">Enable</option>
                                <option value="disable">Disable</option>
                              </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                              <label className="form-label">Search Keywords</label>
                              <input type="text" className="form-control" placeholder="Comma separated keywords" />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 section-divider"></div>

                        {/* Price & Size/Color Details */}
                        <div className="col-lg-12">
                          <h6 className="sub-heading">Price & Color/Size Details</h6>
                          <div className="row">
                            {[
                              { id: 'stock', label: 'Stock' },
                              { id: 'mrp', label: 'MRP' },
                              { id: 'selling_price', label: 'Selling Price' },
                              { id: 'height', label: 'Height (cm)' },
                              { id: 'width', label: 'Width (cm)' },
                              { id: 'length', label: 'Length (cm)' },
                            ].map((field, idx) => (
                              <div className="col-lg-3 mb-3" key={idx}>
                                <label className="form-label">{field.label}</label>
                                <input type="text" className="form-control" placeholder={field.label} />
                              </div>
                            ))}

                            <div className="col-lg-3 mb-3">
                              <label className="form-label">Size (optional)</label>
                              <select className="form-control">
                                <option value="">--Choose Size--</option>
                              </select>
                            </div>

                            <div className="col-lg-3 mb-3">
                              <label className="form-label">Color (optional)</label>
                              <select className="form-control">
                                <option value="">--Choose Color--</option>
                              </select>
                            </div>
                          </div>

                          {/* Variant Table */}
                          <div className="col-lg-12 mb-3">
                            <h6 className="sub-heading pt-4">Option to add more Size/Color in same product</h6>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>SKU</th>
                                  <th>Stock</th>
                                  <th>MRP</th>
                                  <th>Selling Price</th>
                                  <th>Size</th>
                                  <th>Color</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {['SKU', 'Stock', 'MRP', 'Selling Price', 'Size', 'Color'].map((placeholder, index) => (
                                    <td key={index}>
                                      <input type="text" className="form-control" placeholder={placeholder} />
                                    </td>
                                  ))}
                                  <td>
                                    <button type="button" className="btn btn-light-success icon-btn">
                                      <BsPlus />
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Submit & Reset */}
                        <div className="col-lg-12 text-center my-4">
                          <button type="submit" className="btn btn-primary py-2 px-5 me-2">Submit</button>
                          <button type="reset" className="btn btn-secondary py-2 px-5">Reset</button>
                        </div>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default AddProduct;
