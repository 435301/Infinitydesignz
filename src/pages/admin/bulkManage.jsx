import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const BulkManage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const bulkUploads = [
    {
      id: 1,
      menu: 'Living Room Furniture',
      submenu: 'Sofas',
      listSubmenu: '3 Seater Sofa',
      filtersCount: 5,
      featuresCount: 8,
      fileName: 'bulk_sheet1.xlsx',
      filePath: '/uploads/bulk_sheet1.xlsx',
    },
    {
      id: 2,
      menu: 'Bedroom Furniture',
      submenu: 'Beds',
      listSubmenu: 'King Size Bed',
      filtersCount: 4,
      featuresCount: 6,
      fileName: 'bulk_sheet2.xlsx',
      filePath: '/uploads/bulk_sheet2.xlsx',
    },
  ];

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
            marginLeft: isSidebarCollapsed ? '60px' : '301px',
            padding: '20px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          {/* Main Header */}
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h4>Bulk Uploads</h4>
            {/* <a href="index.php">&nbsp;&nbsp;&nbsp;</a> */}
          </div>

          <div className="container-fluid manage">
            {/* Top Action Button */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card mb-3">
                  <div className="card-block manage-btn">
                    <div className="row">
                      <div className="col-md-12 text-end">
                        <button className="btn btn-primary">+ Add New</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk Uploads Table */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <h5>Manage Bulk Uploads</h5>
                      </div>
                      <div className="col-md-6 text-end pt">
                        <button className="btn btn-success me-1">Active</button>
                        <button className="btn btn-default me-1">Inactive</button>
                        <button className="btn btn-danger me-1">Delete</button>
                        <button className="btn btn-warning">Trash</button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 table-responsive">
                        <table className="table table-striped table-hover table-lg align-middle mb-0">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Menu</th>
                              <th>Sub Menu</th>
                              <th>List Sub Menu</th>
                              <th>Filters Count</th>
                              <th>Features Count</th>
                              <th>Excel File</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bulkUploads.map((upload, index) => (
                              <tr key={upload.id}>
                                <td>{index + 1}</td>
                                <td>{upload.menu}</td>
                                <td>{upload.submenu}</td>
                                <td>{upload.listSubmenu}</td>
                                <td>{upload.filtersCount}</td>
                                <td>{upload.featuresCount}</td>
                                <td>
                                  <a href={upload.filePath} target="_blank" rel="noopener noreferrer">
                                    {upload.fileName}
                                  </a>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-light-success icon-btn me-1"
                                    title="Edit"
                                  >
                                    <BsPencilSquare className="text-success" />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-light-danger icon-btn delete-btn"
                                    title="Delete"
                                  >
                                    <BsTrash className="text-danger" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {bulkUploads.length === 0 && (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  No bulk uploads found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

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

export default BulkManage;
