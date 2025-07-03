import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise } from 'react-icons/bs';

const ManageFeatureSet = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const [featureSets, setFeatureSets] = useState([
    { id: 1, name: 'Pearl Features', count: 0 },
    { id: 2, name: 'General', count: 1 },
    { id: 3, name: 'Diamond Features', count: 2 },
    { id: 4, name: 'Body & Design Features', count: 2 },
    { id: 5, name: 'Additional Features', count: 2 },
    { id: 6, name: 'Gold Features', count: 2 },
    { id: 7, name: 'Important Note', count: 2 },
    { id: 8, name: 'Chain Features', count: 2 },
    { id: 9, name: 'In The Box', count: 0 },
  ]);

  useEffect(() => {
    // Simulate fetch data from API
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(featureSets.map((item) => item.id));
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
            <h5>Feature Set</h5>
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
                      + Create Feature Set
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Set List */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-lg-6 d-flex align-items-center">
                    <h3 className="me-2">Accessories</h3>
                    <span className="badge">{featureSets.length}</span>
                  </div>
                  <div className="col-md-6 text-end pt">
                    <button className="btn btn-success me-1">Active</button>
                    <button className="btn btn-default me-1">Inactive</button>
                    <button className="btn btn-danger me-1">Front Active</button>
                    <button className="btn btn-warning me-1">Front Inactive</button>
                  </div>
                </div>

                <div className="feature-row">
                  {featureSets.map((item) => (
                    <div key={item.id} className="feature-item d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleRowCheckboxChange(item.id)}
                          className="me-2"
                        />
                        {item.name}
                      </div>
                      <span className="badge">{item.count}</span>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary mt-3">Set Priority</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFeatureSet;
