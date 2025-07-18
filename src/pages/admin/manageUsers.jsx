import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css'; // Keep only if still using any icons from here

const ManageUsers = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Amit Sharma',
      gender: 'Male',
      email: 'amit.sharma@example.in',
      mobile: '+91-98765-43210',
      regDate: '2025-01-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Priya Patel',
      gender: 'Female',
      email: 'priya.patel@example.in',
      mobile: '+91-87654-32109',
      regDate: '2025-02-20',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Rahul Verma',
      gender: 'Male',
      email: 'rahul.verma@example.in',
      mobile: '+91-76543-21098',
      regDate: '2025-03-10',
      status: 'Active',
    },
  ];

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
  };
  const handleToggleSidebar = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleDelete = (id) => {
    console.log('Delete user with ID:', id);
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
            marginLeft: isSidebarCollapsed ? '60px' : '272px',
            padding: '20px',
            flex: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >          <div className="main-header mt-0">
            <h4>Users</h4>
            <ol className="breadcrumb breadcrumb-title breadcrumb-arrow">
              <li className="breadcrumb-item"><a href="#">Manage</a></li>
            </ol>
          </div>

          <div className="container-fluid manage">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-block">
                    <div className="row mb-3">
                      <div className="col-lg-6">
                        <h5>Manage Users</h5>
                      </div>
                      <div className="col-md-6 text-end">
                        <button className="btn btn-success me-2">Active</button>
                        <button className="btn btn-secondary me-2">Inactive</button>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 table-responsive">
                        <table className="table table-striped table-hover ">
                          <thead className="table-light">
                            <tr>
                              <th><input type="checkbox" /></th>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Email ID</th>
                              <th>Mobile No</th>
                              <th>Registration Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, index) => (
                              <tr key={user.id}>
                                <td><input type="checkbox" /></td>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.regDate}</td>
                                <td>
                                  <span className={`badge bg-${user.status === 'Active' ? 'primary' : 'danger'}`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-outline-success me-2"
                                    onClick={() => handleEdit(user.id)}
                                  >
                                    <FaEdit /> Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(user.id)}
                                  >
                                    <FaTrash /> Delete
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
        </div >
      </div>
    </div>
  );
};

export default ManageUsers;
