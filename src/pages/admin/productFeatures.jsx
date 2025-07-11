import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsPlus } from 'react-icons/bs';


const ProductFeatures = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit feature data logic here
    console.log('Features submitted');
  };

  const renderInput = (label, id, value = '') => (
    <div className="col-lg-6 mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        className="form-control"
        defaultValue={value}
        placeholder={`Enter ${label}`}
      />
    </div>
  );

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
            marginLeft: isSidebarCollapsed ? '60px' : '295px',
            padding: '20px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="section-nav mb-3 d-flex gap-3">
            <a href="/admin/add-product">Add Product</a>
            <a href="/admin/product-image">Product Images</a>
            <a href="/admin/product-filter">Product Filters</a>
            <a href="#" className="active">Product Features</a>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3">
                    <h5 className="text-dark mb-0">Product Features</h5>
                  </div>

                  <div className="card-block">
                    <form onSubmit={handleSubmit} className="app-form">
                      <div className="row">
                        <div className="col-lg-6">
                          <h6 className="sub-heading mb-3">General Details</h6>
                          <div className="row">
                            {renderInput('Style Code', 'style-code', 'saree01')}
                            {renderInput('Model', 'model', 'fashin saree')}
                            {renderInput('Type', 'type', 'saree')}
                            {renderInput('Brand', 'brand', 'asha')}
                            {renderInput('Ideal For', 'ideal-for')}
                            {renderInput('Pack Of', 'pack-of')}
                            {renderInput('With Blouse', 'with-blouse')}
                            {renderInput('Occasion', 'occasion')}
                            {renderInput('Color', 'color')}
                            {renderInput('Other Combo Details', 'other-combo-details')}
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <h6 className="sub-heading mb-3">Saree Details</h6>
                          <div className="row">
                            {renderInput('Saree Length', 'saree-length')}
                            {renderInput('Blouse Length', 'blouse-length')}
                          </div>
                        </div>

                        <div className="col-lg-12 text-center my-4">
                          <button type="submit" className="btn btn-primary py-2 px-5 me-2">Update Features</button>
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
      </div>
    </div>
  );
};

export default ProductFeatures;
