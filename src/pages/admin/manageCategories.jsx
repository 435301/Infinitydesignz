import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import axios from 'axios';
import { fetchCategories } from '../../redux/actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryModal from '../../includes/addCategory';

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.categories || {});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className='sidebar-mini fixed'>
      <div class="wrapper">
        <HeaderAdmin />
        <aside class="main-sidebar hidden-print ">
          <Sidebar />
        </aside>
        <div className="content-wrapper">
          <div className="main-header">
            <h4>Manage Categories</h4>
          </div>

          <div className="container-fluid manage">
            <div className="card card-block manage-btn mb-4">
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
                  <button className="btn btn-danger"><i className="ti-search"></i></button>
                  <button className="btn btn-success"><i className="icon-refresh"></i></button>
                </div>
                <div className="col-md-4 text-end">
                  <button className='btn btn-primary' type='button' onClick={() => setShowModal(true)}>+ Add New</button>
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
                        <th><input type="checkbox" /></th>
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
                      {categories.map((cat, index) => {
                        const parentCategory = categories.find(parent => parent.id === cat.parent_id);

                        return (
                          <tr key={cat.id}>
                            <td><input type="checkbox" /></td>
                            <td>{index + 1}</td>
                            <td>{parentCategory ? parentCategory.title : cat.title}</td>
                            <td><img src={parentCategory ? parentCategory.appIcon : cat.appIcon} alt="App Icon" className="rounded-circle" width="50" height="50" /></td>
                            <td><img src={parentCategory ? parentCategory.webImage : cat.webImage} alt="Web Icon" className="rounded-circle" width="50" height="50" /></td>
                            <td><img src={parentCategory ? parentCategory.mainImage : cat.mainImage} alt="Main" className="rounded-circle" width="50" height="50" /></td>
                            <td>
                              <span className={`badge ${cat.status === 'active' ? 'text-light-primary' : 'text-light-danger'}`}>
                                {parentCategory ? parentCategory.status : cat.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-light icon-btn"><i className="ti-pencil-alt text-danger"></i></button>
                              <button className="btn btn-light icon-btn"><i className="ti-eye text-dark"></i></button>
                            </td>
                          </tr>
                        );
                      })}

                      {categories.length === 0 && !loading && <tr><td colSpan="8">No categories found.</td></tr>}
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
