import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';

const BulkUpload = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const [formData, setFormData] = useState({
    menu: '',
    submenu: '',
    listSubmenu: '',
    filtersCount: '',
    featuresCount: '',
    bulkFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'bulkFile') {
      setFormData({ ...formData, bulkFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can now send formData to your backend API
  };

  const handleReset = () => {
    setFormData({
      menu: '',
      submenu: '',
      listSubmenu: '',
      filtersCount: '',
      featuresCount: '',
      bulkFile: null,
    });
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div
          className="content-wrapper"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '295px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="container-fluid">
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h5 className="text-dark mb-0">Bulk Upload</h5>
                    <a href='/admin/bulk-manage' className="btn btn-primary btn-sm">Manage</a>
                  </div>

                  <div className="card-block">
                    <form onSubmit={handleSubmit} onReset={handleReset} className="app-form" encType="multipart/form-data">
                      <div className="row">

                        {/* Menu */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="menu" className="form-label">
                            Menu <span className="text-danger">*</span>
                          </label>
                          <select
                            id="menu"
                            name="menu"
                            className="form-control"
                            value={formData.menu}
                            onChange={handleChange}
                          >
                            <option value="">--Choose Menu--</option>
                            {/* Populate dynamically */}
                          </select>
                        </div>

                        {/* Sub Menu */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="submenu" className="form-label">
                            Sub Menu <span className="text-danger">*</span>
                          </label>
                          <select
                            id="submenu"
                            name="submenu"
                            className="form-control"
                            value={formData.submenu}
                            onChange={handleChange}
                          >
                            <option value="">--Choose Submenu--</option>
                          </select>
                        </div>

                        {/* List Sub Menu */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="listSubmenu" className="form-label">
                            List Submenu <span className="text-danger">*</span>
                          </label>
                          <select
                            id="listSubmenu"
                            name="listSubmenu"
                            className="form-control"
                            value={formData.listSubmenu}
                            onChange={handleChange}
                          >
                            <option value="">--Choose List Submenu--</option>
                          </select>
                        </div>

                        {/* Filters Count */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="filtersCount" className="form-label">
                            Filters Count
                          </label>
                          <input
                            type="number"
                            id="filtersCount"
                            name="filtersCount"
                            className="form-control"
                            placeholder="Enter Filters Count"
                            value={formData.filtersCount}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Features Count */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="featuresCount" className="form-label">
                            Features Count <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="featuresCount"
                            name="featuresCount"
                            className="form-control"
                            placeholder="Enter Features Count"
                            value={formData.featuresCount}
                            onChange={handleChange}
                          />
                        </div>

                        {/* File Upload */}
                        <div className="col-lg-4 mb-3">
                          <label htmlFor="bulkFile" className="form-label">
                            Upload XL Workbook <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            id="bulkFile"
                            name="bulkFile"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>

                        {/* Buttons */}
                        <div className="col-lg-12 text-center mt-4">
                          <button type="submit" className="btn btn-primary px-4 me-2">
                            Submit
                          </button>
                          <button type="reset" className="btn btn-secondary px-4">
                            Reset
                          </button>
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

export default BulkUpload;
