import React, { useState } from 'react';
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';


const HomeScreenPromotions = () => {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: 'Leather Sofa',
      image: 'assets/images/avatar-1.png',
      category: 'Living Room',
      priority: 1,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Dining Table Set',
      image: 'assets/images/avatar-1.png',
      category: 'Dining Room',
      priority: 2,
      status: 'Active',
    },
    {
      id: 3,
      title: 'Wooden Bookshelf',
      image: 'assets/images/avatar-1.png',
      category: 'Office Furniture',
      priority: 3,
      status: 'Active',
    },
    {
      id: 4,
      title: 'Queen Bed Frame',
      image: 'assets/images/avatar-1.png',
      category: 'Bedroom',
      priority: 4,
      status: 'Inactive',
    },
  ]);

  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
  });

  const categories = [
    { value: '', label: '- Select Category -' },
    { value: '26', label: 'Home & Kitchen' },
    { value: '37', label: 'Kids' },
    { value: '44', label: 'Luggage & Travel' },
    { value: '7', label: 'Men' },
    { value: '36', label: 'Mobile' },
    { value: '47', label: 'Sports & Fitness' },
    { value: '3', label: 'Women' },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log('Search filters:', filters);
   
  };

  const handleReset = () => {
    setFilters({ category: '', status: '', search: '' });
    // Optionally reload default promotions
  };

  const handleSelectAll = (e) => {
    document.querySelectorAll('.row-checkbox').forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  const handleToggleStatus = (status) => {
    console.log(`Toggle status to: ${status}`);
    // Implement API call to update selected promotions
  };

  const handleUpdatePriority = () => {
    console.log('Update priority');
    // Implement API call to update priority
  };

  return (
      <div className="sidebar-mini fixed">
        <div className="wrapper">
          <HeaderAdmin />
          <aside className="main-sidebar hidden-print">
            <Sidebar />
          </aside>
          <div className="content-wrapper p-4">
            <div className="main-header" style={{ marginTop: '0px' }}>
              <h4>Promotions</h4>
            </div>
            <div className="container-fluid manage">
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-block manage-btn">
                      <div className="row">
                        <div className="col-lg-3">
                          <select
                            className="form-control"
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                          >
                            {categories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-lg-3">
                          <select
                            className="form-control"
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                          >
                            <option value="">- Select Status -</option>
                            <option value="active">Active</option>
                            <option value="inactive">In Active</option>
                          </select>
                        </div>
                        <div className="col-lg-2 p-0 ">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search By"
                              name="search"
                              value={filters.search}
                              onChange={handleFilterChange}
                            />
                            <span className="input-group-btn"></span>
                          </div>
                        </div>
                        <div className="col-lg-2 mt-1 pt-1 ">
                          <button className="btn btn-danger me-2" onClick={handleSearch}>
                            <Search />
                          </button>
                          <button className="btn btn-success" onClick={handleReset}>
                            <ArrowRepeat />
                          </button>
                        </div>
                        <div className="col-lg-2 text-end">
                          <a
                            href="/admin/add-home-screen-create-promotion"
                            className="btn btn-primary"
                            type="button"
                          >
                            + Add New
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-block">
                      <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-md-6 text-end pt">
                          <button
                            className="btn btn-success me-2"
                            onClick={() => handleToggleStatus('Active')}
                          >
                            Active
                          </button>
                          <button
                            className="btn btn-default me-2"
                            onClick={() => handleToggleStatus('In Active')}
                          >
                            In Active
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={handleUpdatePriority}
                          >
                            Update Priority
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 table-responsive">
                          <table className="table-lg table-striped align-middle mb-0 table table-hover">
                            <thead>
                              <tr>
                                <th>
                                  <input type="checkbox" id="select-all" onChange={handleSelectAll} />
                                </th>
                                <th>S.no</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {promotions.map((promotion, index) => (
                                <tr key={promotion.id}>
                                  <td>
                                    <input type="checkbox" className="row-checkbox" />
                                  </td>
                                  <td>{index + 1}</td>
                                  <td>{promotion.title}</td>
                                  <td>
                                    <img
                                      src={promotion.image}
                                      alt={promotion.title}
                                      className="rounded-circle"
                                      width="25"
                                      height="25"
                                    />
                                  </td>
                                  <td>{promotion.category}</td>
                                  <td>{promotion.priority}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        promotion.status === 'Active'
                                          ? 'text-light-primary'
                                          : 'text-light-danger'
                                      }`}
                                      style={{
                                        backgroundColor:
                                          promotion.status === 'Active' ? '#d4f7f2' : '#f8d7da',
                                        color: promotion.status === 'Active' ? '#28a745' : '#dc3545',
                                      }}
                                    >
                                      {promotion.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end mt-3">
                              <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                                  Previous
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  1
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  2
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  3
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  Next
                                </a>
                              </li>
                            </ul>
                          </nav>
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

export default HomeScreenPromotions;