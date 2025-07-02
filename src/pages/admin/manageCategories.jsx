import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsEye, BsSearch, BsArrowClockwise } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryAction';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import AddCategoryModal from '../../includes/addCategory';
import '../../css/admin/style.css';

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories = [], loading, error } = useSelector((state) => state.categories || {});
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((cat) => {
    const parent = categories.find((p) => p.id === cat.parent_id);
    const title = cat.title.toLowerCase();
    const parentTitle = parent?.title?.toLowerCase() || '';
    const matchesSearch = `${title} ${parentTitle}`.includes(searchTerm.toLowerCase());

    const categoryStatus = parent ? parent.status : cat.status;
    const matchesStatus = statusFilter ? categoryStatus === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin />
        <aside className="main-sidebar hidden-print">
          <Sidebar />
        </aside>
        <div className="content-wrapper">
          <div className="main-header">
            <h4>Manage Categories</h4>
          </div>

          <div className="container-fluid manage">
            <div className="card mb-3">
              <div className="card-block manage-btn">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Category Title"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-control"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">- Select Status -</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-2 d-flex gap-2">
                    <button className="btn btn-danger">
                      <BsSearch />
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('');
                      }}
                    >
                      <BsArrowClockwise />
                    </button>
                  </div>
                  <div className="col-md-4 text-end">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      + Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {loading && <p>Loading categories...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            <div className="card">
              <div className="card-block">
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-lg align-middle mb-0">
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>S.No</th>
                        <th>Category</th>
                        <th>App Icon</th>
                        <th>Web Icon</th>
                        <th>Main Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat, index) => {
                          const parentCategory = categories.find(
                            (parent) => parent.id === cat.parent_id
                          );

                          return (
                            <tr key={cat.id}>
                              <td>
                                <input type="checkbox" />
                              </td>
                              <td>{index + 1}</td>
                              <td>{parentCategory ? parentCategory.title : cat.title}</td>
                              <td>
                                <img
                                  src={parentCategory ? parentCategory.appIcon : cat.appIcon}
                                  alt="App Icon"
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <img
                                  src={parentCategory ? parentCategory.webImage : cat.webImage}
                                  alt="Web Icon"
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <img
                                  src={parentCategory ? parentCategory.mainImage : cat.mainImage}
                                  alt="Main"
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <span
                                  className={`badge ${(parentCategory ? parentCategory.status : cat.status) === 'active'
                                      ? 'text-light-primary'
                                      : 'text-light-danger'
                                    }`}
                                >
                                  {parentCategory ? parentCategory.status : cat.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-light icon-btn"
                                  style={{ marginRight: '5px' }}
                                >
                                  <BsPencilSquare style={{ fontSize: '18px', color: '#dc3545' }} />
                                </button>
                                <button className="btn btn-light icon-btn">
                                  <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="8">No categories found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {showModal && <AddCategoryModal show={showModal} setShow={setShowModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
