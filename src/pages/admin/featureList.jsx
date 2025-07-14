import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise } from 'react-icons/bs';

const ManageFeatureList = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const featureGroups = [
    {
      title: 'Accessories',
      productCode: 'Product code',
      features: [
        { id: 1, name: 'Pearl Features', count: 0 },
        { id: 2, name: 'General', count: 1 },
        { id: 3, name: 'Diamond Features', count: 2 },
        { id: 4, name: 'Body & Design Features', count: 2 },
        { id: 5, name: 'Additional Features', count: 2 },
        { id: 6, name: 'Gold Features', count: 2 },
        { id: 7, name: 'Important Note', count: 2 },
        { id: 8, name: 'Chain Features', count: 2 },
        { id: 9, name: 'In The Box', count: 0 },
      ],
    },
    {
      title: 'Books',
      productCode: 'Product code',
      features: [
        { id: 10, name: 'Pearl Features', count: 0 },
        { id: 11, name: 'General', count: 1 },
        { id: 12, name: 'Diamond Features', count: 2 },
        { id: 13, name: 'Body & Design Features', count: 2 },
        { id: 14, name: 'Additional Features', count: 2 },
        { id: 15, name: 'Gold Features', count: 2 },
        { id: 16, name: 'Important Note', count: 2 },
        { id: 17, name: 'Chain Features', count: 2 },
        { id: 18, name: 'In The Box', count: 0 },
      ],
    },
  ];

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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
          className="content-wrapper"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '272px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h5>Feature List</h5>
          </div>

          <div className="container-fluid manage">
            {/* Top Filters */}
            <div className="card mb-3">
              <div className="card-block manage-btn p-3">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Search By" />
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
                    <button className="btn btn-primary">+ Create Feature Set</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Group Sections */}
            <div className="card">
              <div className="card-block p-3">
                <div className="row mb-3">
                  <div className="col-lg-6" />
                  <div className="col-md-6 text-end pt">
                    <button className="btn btn-success me-1">Active</button>
                    <button className="btn btn-default me-1">Inactive</button>
                    <button className="btn btn-danger me-1">Front Active</button>
                    <button className="btn btn-warning me-1">Front Inactive</button>
                  </div>
                </div>

                {featureGroups.map((group, index) => (
                  <div key={index} className="mb-4">
                    <div className="row  mb-3">
                      <div>
                        <h3>{group.title}</h3>
                        <h6 className="text-info">{group.productCode}</h6>
                      </div>
                    </div>

                    <div className="feature-row d-flex flex-wrap gap-3">
                      {group.features.map((feature) => (
                        <div
                          key={feature.id}
                          className="feature-item d-flex justify-content-between align-items-center"
                          style={{
                            backgroundColor: '#2ccfc4',
                            color: '#fff',
                            padding: '10px 15px',
                            borderRadius: '4px',
                            flex: '0 0 30%',
                          }}
                        >
                          <div>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(feature.id)}
                              onChange={() => handleCheckboxChange(feature.id)}
                              className="me-2"
                            />
                            {feature.name}
                          </div>
                          <span className="badge bg-white text-dark">{feature.count}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="btn mt-3 set-priority-btn"
                      style={{
                        backgroundColor: '#0da79e',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '16px',
                      }}
                    >
                      Set Priority
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFeatureList;
