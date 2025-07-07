import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash } from 'react-icons/bs';

const ManageBrands = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const brands = [
    { id: 1, name: 'Godrej Interio', status: 'Active' },
    { id: 2, name: 'Durian', status: 'Inactive' },
    { id: 3, name: 'Pepperfry', status: 'Active' },
    { id: 4, name: 'Nilkamal', status: 'Active' },
    { id: 5, name: 'Urban Ladder', status: 'Active' },
  ];

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
            <h4>Brands</h4>
          </div>

          <div className="container-fluid manage">
            {/* Filter and Add Brand Section */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
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
                      <BsSearch style={{ fontSize: '18px' }} />
                    </button>
                    <button className="btn btn-success">
                      <BsArrowClockwise style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <a href="/addBrand" className="btn btn-primary" type="button">
                      + Add New
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Brands Table Section */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <h5>Brands</h5>
                  </div>
                  <div className="col-md-6 text-end">
                    <button className="btn btn-success me-1">Active</button>
                    <button className="btn btn-default me-1">In Active</button>
                    <button className="btn btn-danger me-1">Front Active</button>
                    <button className="btn btn-warning me-1">Front In Active</button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover table-lg align-middle mb-0">
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" id="select-all" />
                        </th>
                        <th>S.No</th>
                        <th>Brands</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map((brand, index) => (
                        <tr key={brand.id}>
                          <td>
                            <input type="checkbox" className="row-checkbox" />
                          </td>
                          <td>{index + 1}</td>
                          <td>{brand.name}</td>
                          <td>
                            <span className={`badge ${brand.status === 'Active' ? 'text-light-primary' : 'text-light-danger'}`}>
                              {brand.status}
                            </span>
                          </td>
                          <td>
                            <a
                              href={`/create-brand-edit/${brand.id}`}
                              className="btn btn-light-success icon-btn b-r-4 me-1"
                              title="Edit"
                            >
                              <BsPencilSquare style={{ color: 'green', fontSize: '18px' }} />
                            </a>
                            <button
                              type="button"
                              className="btn btn-light-danger icon-btn b-r-4 delete-btn"
                              title="Delete"
                            >
                              <BsTrash style={{ color: 'red', fontSize: '18px' }} />
                            </button>
                          </td>
                        </tr>
                      ))}
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

export default ManageBrands;
