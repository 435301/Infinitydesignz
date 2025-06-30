import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import axios from 'axios';


const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  console.log('categories', categories)

  useEffect(() => {
    axios.get('http://68.183.89.229:4005/categories') 
      .then(response => {
        setCategories(response.data); 
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className='sidebar-mini fixed'>
  <div className='wrapper'>
    <HeaderAdmin/>
    <Sidebar/>

    <div className="content-wrapper">
      <div className="main-header" style={{ marginTop: '0px' }}>
        <h4>Manage Categories</h4>
      </div>
      <div className="container-fluid manage">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-block manage-btn">
                <div className="row">
                  <div className="col-md-3">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search By" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select className="form-control">
                      <option value="">- Select Status -</option>
                      <option value="active">Active</option>
                      <option value="inactive">In Active</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-danger"><i className="ti-search"></i></button>
                    <button className="btn btn-success"><i className="icon-refresh"></i></button>
                  </div>
                  <div className="col-md-4 text-end">
                    <a href="/add-category" className="btn btn-primary">+ Add New</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-md-6 text-end">
                    <button className="btn btn-success">Active</button>
                    <button className="btn btn-default">In Active</button>
                    <button className="btn btn-danger">Front Active</button>
                    <button className="btn btn-warning">Front In Active</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 table-responsive">
                    <table className="table-lg table-striped align-middle mb-0 table table-hover">
                      <thead>
                        <tr>
                          <th><input type="checkbox" id="select-all" /></th>
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
                        {categories.map((cat, index) => (
                          <tr key={cat.id || index}>
                            <td><input type="checkbox" className="row-checkbox" /></td>
                            <td>{index + 1}</td>
                            <td>{cat.name}</td>
                            <td><img src={cat.app_icon} alt="App Icon" className="rounded-circle" width="50" height="50" /></td>
                            <td><img src={cat.web_icon} alt="Web Icon" className="rounded-circle" width="50" height="50" /></td>
                            <td><img src={cat.main_image} alt="Main Image" className="rounded-circle" width="50" height="50" /></td>
                            <td>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: cat.status === 'Active' ? '#d4f7f2' : '#f8d7da',
                                  color: cat.status === 'Active' ? '#28a745' : '#dc3545'
                                }}
                              >
                                {cat.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-light icon-btn b-r-4">
                                <i className="ti-pencil-alt text-danger"></i>
                              </button>
                              <button className="btn btn-light icon-btn b-r-4">
                                <i className="ti-eye text-dark"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {categories.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center">No categories found.</td>
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
    </div>
        
    </div>
      </div>
  );
};


export default ManageCategories;
