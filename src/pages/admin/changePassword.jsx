import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';

const ChangePassword = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    alert("Password changed successfully.");
    // TODO: Replace with actual API call
  };

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </aside>

        <div
          className="content-wrapper p-3"
          style={{
            marginLeft: isSidebarCollapsed ? '60px' : '272px',
            padding: '20px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <div className="main-header ">
            <h4> Change Password</h4>
          
          </div>

          <div className="card mx-3">
            <div className="card-body">
              <form className="row" onSubmit={handleSubmit}>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    placeholder="Enter Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-lg-4 mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="Enter New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-lg-4 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary px-5">
                    <i className="bi bi-save me-2"></i>Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
