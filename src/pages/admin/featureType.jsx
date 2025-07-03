import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash } from 'react-icons/bs';

const ManageFeatureType = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const [featureTypes, setFeatureTypes] = useState([
    { id: 1, type: 'Small', status: 'Active' },
    { id: 2, type: 'Medium', status: 'Inactive' },
    { id: 3, type: 'Medium', status: 'Active' },
    { id: 4, type: 'Small', status: 'Active' },
    { id: 5, type: 'Small', status: 'Active' },
  ]);

  useEffect(() => {
    // Simulate API data load
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(featureTypes.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div
          className="content-wrapper mb-4"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '301px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h5>Feature Type</h5>
          </div>

          <div className="container-fluid manage">
            {/* Search and Filters */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search By" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select className="form-control">
                      <option value="">- Select Status -</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-2 d-flex gap-2">
                    <button className="btn btn-danger">
                      <BsSearch style={{ fontSize: '18px' }} />
                    </button>
                    <button className="btn btn-success">
                      <BsArrowClockwise style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-primary" type="button">
                      + Create Feature
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-md-12 text-end pt">
                    <button className="btn btn-success me-1">Active</button>
                    <button className="btn btn-default me-1">Inactive</button>
                    <button className="btn btn-danger me-1">Front Active</button>
                    <button className="btn btn-warning me-1">Front Inactive</button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover table-lg align-middle mb-0">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            id="select-all"
                            checked={selectedRows.length === featureTypes.length && featureTypes.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>S.No</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {featureTypes.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="checkbox"
                              className="row-checkbox"
                              checked={selectedRows.includes(item.id)}
                              onChange={() => handleRowCheckboxChange(item.id)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td>
                            <span
                              className={`badge ${item.status === 'Active' ? 'text-light-primary' : 'text-light-danger'}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-light icon-btn"
                              style={{ marginRight: '5px' }}
                              title="Edit"
                            >
                              <BsPencilSquare style={{ fontSize: '18px', color: '#28a745' }} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-light icon-btn delete-btn"
                              title="Delete"
                            >
                              <BsTrash style={{ fontSize: '18px', color: '#dc3545' }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {featureTypes.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No feature types found.
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
  );
};

export default ManageFeatureType;
