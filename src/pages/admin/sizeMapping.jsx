import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { BsSearch, BsArrowClockwise, BsPencilSquare, BsTrash } from 'react-icons/bs';

const ManageSizeMapping = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sizeMappings, setSizeMappings] = useState([
    { id: 1, size: 'Small', categories: 'Sofas, Beds, Wardrobes', status: 'Active' },
    { id: 2, size: 'Medium', categories: 'Dining Tables, Sofas, Recliners', status: 'Inactive' },
    { id: 3, size: 'Large', categories: 'Beds, Coffee Tables, Bookshelves', status: 'Active' },
    { id: 4, size: 'Extra Large', categories: 'Chairs, Storage Units, Mattresses', status: 'Active' },
    { id: 5, size: 'Extra Small', categories: 'Sofas, TV Units, Dining Sets', status: 'Active' },
  ]);

  useEffect(() => {
    // Simulating data fetch; replace with actual Redux or API call if needed
    // Example: dispatch(fetchSizeMappings());
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(sizeMappings.map((item) => item.id));
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
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>

        <div className="content-wrapper">
          <div className="main-header" style={{ marginTop: '0px' }}>
            <h4>Size Mapping</h4>
          </div>

          <div className="container-fluid manage">
            {/* Top Filters and Buttons */}
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search By" />
                      <span className="input-group-btn"></span>
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
                      + Size Mapping
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Mapping Table */}
            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <h5>Sizes</h5>
                  </div>
                  <div className="col-md-6 text-right pt">
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
                            checked={selectedRows.length === sizeMappings.length && sizeMappings.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>S.No</th>
                        <th>Sizes</th>
                        <th>Categories</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeMappings.map((item, index) => (
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
                          <td>{item.size}</td>
                          <td>{item.categories}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.status === 'Active' ? 'text-light-primary' : 'text-light-danger'
                              }`}
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
                      {sizeMappings.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No size mappings found.
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

export default ManageSizeMapping;