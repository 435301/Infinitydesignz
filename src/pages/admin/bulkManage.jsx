import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';

const BulkUpload = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div className="content-wrapper" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease' }}>
          <div className="main-header">
            <h4>Bulk Uploads</h4>
          </div>

          <div className="container-fluid manage">
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row">
                  <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Search by" />
                  </div>
                  <div className="col-md-3">
                    <select className="form-control">
                      <option value="">- Select Status -</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-danger me-2">
                      <i className="bi bi-search"></i>
                    </button>
                    <button className="btn btn-success">
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </div>

                  <div className="col-md-4 text-end">
                    <a href="/admin/bulk-upload" className="btn btn-primary">+ Create New</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <h5>Manage Bulk Uploads</h5>
                  </div>
                  <div className="col-md-6 text-end">
                    <button className="btn btn-success">Active</button>
                    <button className="btn btn-default">Inactive</button>
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-warning">Trash</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table-lg table-striped align-middle table-hover table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>List submenu</th>
                        <th>Filters Count</th>
                        <th>Features Count</th>
                        <th>Sheet Name</th>
                        <th>Created On</th>
                        <th>Updated On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2].map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{index === 0 ? 'Living Room Furniture' : 'Bedroom Furniture'}</td>
                          <td>3</td>
                          <td>{index === 0 ? 3 : 4}</td>
                          <td><a href="#">ec325fbc2b396.xlsx</a></td>
                          <td>21-Dec-2021</td>
                          <td>21-Dec-2021</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-light-success icon-btn b-r-4 me-1"
                              onClick={() => setShowEditModal(true)}
                            >
                              <i className="bi bi-pencil text-success"></i>
                            </button>

                            <button
                              type="button"
                              className="btn btn-light-danger icon-btn b-r-4"
                              // onClick={() => handleDelete(item.id)} 
                            >
                              <i className="bi bi-trash text-danger"></i>
                            </button>
                          </td>


                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <nav className="mt-3" aria-label="Page navigation">
                    <ul className="pagination justify-content-end">
                      <li className="page-item disabled">
                        <span className="page-link">Previous</span>
                      </li>
                      {[1, 2, 3].map((num) => (
                        <li className="page-item" key={num}><a className="page-link" href="#">{num}</a></li>
                      ))}
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Component Placeholder */}
          {showEditModal && (
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Bulk Upload Sheet</h5>
                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <form className="app-form">
                      <div className="row">
                        <div className="col-lg-6 mb-3">
                          <label>Menu <span className="text-danger">*</span></label>
                          <select className="form-control">
                            <option selected>Sliders</option>
                          </select>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label>Sub Menu <span className="text-danger">*</span></label>
                          <select className="form-control">
                            <option selected>Sliders Image</option>
                          </select>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label>List Submenu <span className="text-danger">*</span></label>
                          <select className="form-control">
                            <option selected>Sliders Product</option>
                          </select>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label>Filters Count</label>
                          <input type="number" className="form-control" defaultValue="23" />
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label>Features Count <span className="text-danger">*</span></label>
                          <input type="number" className="form-control" defaultValue="34" />
                        </div>
                        <div className="col-lg-6 mb-3">
                          <label>Upload XL Workbook <span className="text-danger">*</span></label>
                          <input type="file" className="form-control" />
                          <a href="#" className="text-info">ec325fbc2b396.xlsx</a>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                    <button type="button" className="btn btn-success">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};




export default BulkUpload;
