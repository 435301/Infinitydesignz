import React, { useEffect, useState } from 'react';
import '../../css/admin/style.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryAction';
import { BsPencilSquare, BsEye, BsSearch, BsArrowClockwise } from 'react-icons/bs';
import AddListSubCategoryModal from '../../includes/addListSubCategory';

const ListSubCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const { categories = [], loading, error } = useSelector((state) => state.categories || {});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length) {
      const topLevel = categories.filter((cat) => cat.parent_id === null);
      const subCats = categories.filter((cat) => cat.parent_id !== null);
      const subCatIds = subCats.map((cat) => cat.id);
      const subSubCats = categories.filter((cat) => subCatIds.includes(cat.parent_id));
      const mapped = subSubCats.map((subSub) => {
        const parent = categories.find((c) => c.id === subSub.parent_id); // subcategory
        const grandParent = categories.find((c) => c.id === parent?.parent_id); // main category
        return {
          ...subSub,
          subCategory: parent?.title || 'N/A',
          category: grandParent?.title || 'N/A',
        };
      });
      setSubSubCategories(mapped);
    }
  }, [categories]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(subSubCategories.map((item) => item.id));
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
    <div className="wrapper sidebar-mini fixed">
      <HeaderAdmin />
      <aside className="main-sidebar hidden-print">
        <Sidebar />
      </aside>

      <div className="content-wrapper">
        <div className="main-header" style={{ marginTop: 0 }}>
          <h4>List Sub Categories</h4>
        </div>

        <div className="container-fluid manage">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="card">
                <div className="card-block manage-btn">
                  <div className="row align-items-center">
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
                      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add New
                      </button>
                    </div>
                  </div>
                  {loading && <p>Loading categories...</p>}
                  {error && <p className="text-danger">Error: {error}</p>}
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
                      <button className="btn btn-success me-1">Active</button>
                      <button className="btn btn-default me-1">Inactive</button>
                      <button className="btn btn-danger me-1">Front Active</button>
                      <button className="btn btn-warning me-1">Front Inactive</button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 table-responsive">
                      <table className="table table-striped table-hover align-middle mb-0">
                        <thead>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                id="select-all"
                                checked={selectedRows.length === subSubCategories.length && subSubCategories.length > 0}
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>S.No</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Category Title</th>
                            <th>App Icon</th>
                            <th>Web Icon</th>
                            <th>Main Image</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subSubCategories.map((item, index) => (
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
                              <td>{item.category}</td>
                              <td>{item.subCategory}</td>
                              <td>{item.title}</td>
                              <td>
                                <img
                                  src={item.appIcon}
                                  alt={`${item.title} App Icon`}
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <img
                                  src={item.webIcon}
                                  alt={`${item.title} Web Icon`}
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <img
                                  src={item.mainImage}
                                  alt={`${item.title} Main Image`}
                                  className="rounded-circle"
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>
                                <span
                                  className={`badge text-light-${
                                    item.status === 'active' ? 'primary' : 'danger'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-light icon-btn"
                                  style={{ marginRight: '5px' }}
                                >
                                  <BsPencilSquare
                                    style={{
                                      fontSize: '18px',
                                      color: item.status === 'active' ? '#28a745' : '#dc3545',
                                    }}
                                  />
                                </button>
                                <button className="btn btn-light icon-btn">
                                  <BsEye style={{ fontSize: '18px', color: '#212529' }} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {subSubCategories.length === 0 && !loading && (
                            <tr>
                              <td colSpan="10" className="text-center">
                                No sub-subcategories found.
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
          {showModal && <AddListSubCategoryModal show={showModal} setShow={setShowModal} />}
        </div>
      </div>
    </div>
  );
};

export default ListSubCategory;