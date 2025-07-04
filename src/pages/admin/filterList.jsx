import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise } from 'react-icons/bs';

const ManageFilterList = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const [filterItems, setFilterItems] = useState([
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
    // Simulate API call if needed
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filterItems.map((item) => item.id));
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
            marginLeft: isSidebarCollapsed ? '60px' : '295px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h5>Filter List</h5>
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
                      <BsSearch />
                    </button>
                    <button className="btn btn-success">
                      <BsArrowClockwise />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className="btn btn-primary">+ Create Filter Set</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter List Items */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                      <h3>Accessories</h3>
                      <span
                        className="badge"
                        style={{ backgroundColor: '#0da79e', fontSize: '16px', padding: '8px 12px' }}
                      >
                        {filterItems.length}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 text-end pt">
                    <button className="btn btn-success me-1">Active</button>
                    <button className="btn btn-default me-1">Inactive</button>
                    <button className="btn btn-danger me-1">Front Active</button>
                    <button className="btn btn-warning me-1">Front Inactive</button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {filterItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: '#2ccfc4',
                        color: '#fff',
                        padding: '10px 15px',
                        marginBottom: '10px',
                        flex: '0 0 32%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '4px',
                      }}
                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleRowCheckboxChange(item.id)}
                          style={{ marginRight: '10px' }}
                        />
                        {item.name}
                      </div>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#fff',
                          color: '#000',
                          fontSize: '14px',
                          padding: '5px 10px',
                        }}
                      >
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn"
                  style={{
                    backgroundColor: '#0da79e',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    marginTop: '20px',
                  }}
                >
                  Set Priority
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFilterList;
