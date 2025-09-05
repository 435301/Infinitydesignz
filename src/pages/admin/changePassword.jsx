import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/authAction';
import { getAdminToken } from '../../utils/adminAuth';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleToggleSidebar = (collapsed) => setIsSidebarCollapsed(collapsed);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
     if (formErrors[name]) {
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }
  };

  const validate = () => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.oldPassword.trim()) {
      errors.oldPassword = "Old Password is required";
    }

    if (!formData.newPassword.trim()) {
      errors.newPassword = "New Password is required";
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "New Password and Confirm Password do not match";
    }

    return errors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }
    const token = getAdminToken();
    dispatch(
      changePassword(formData.email, formData.oldPassword, formData.newPassword, token)
    );
  };

  useEffect(() => {
    if (success) {
      setFormData({ email: "", oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  }, [success ]);

  return (
    <div className="sidebar-mini fixed">
      <div className="wrapper">
        <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
        <aside className="main-sidebar hidden-print">
          <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)}/>
        </aside>

        <div
          className="content-wrapper p-3"
          style={{
            marginLeft: isSidebarCollapsed ? "60px" : "272px",
            padding: "20px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <div className="main-header">
            <h4> Change Password</h4>
          </div>

          <div className="card mx-3">
            <div className="card-body">
              <form className="row" onSubmit={handleSubmit}>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Email<span className='text-danger'>*</span></label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (<div className="invalid-feedback">{formErrors.email}</div>)}
                </div>
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Old Password<span className='text-danger'>*</span></label>
                  <input
                    type="password"
                    name="oldPassword"
                    className={`form-control ${formErrors.oldPassword ? "is-invalid" : ""}`}

                    placeholder="Enter Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  />
                  {formErrors.oldPassword && (<div className="invalid-feedback">{formErrors.oldPassword}</div>)}
                </div>

                <div className="col-lg-4 mb-3">
                  <label className="form-label">New Password<span className='text-danger'>*</span></label>
                  <input
                    type="password"
                    name="newPassword"
                    className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                    placeholder="Enter New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  {formErrors.newPassword && (<div className="invalid-feedback">{formErrors.newPassword}</div>)}
                </div>

                <div className="col-lg-4 mb-3">
                  <label className="form-label">Confirm Password<span className='text-danger'>*</span></label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {formErrors.confirmPassword && (<div className="invalid-feedback">{formErrors.confirmPassword}</div>)}
                </div>

                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary px-5" disabled={loading}>
                    {loading ? (
                      <>
                        <i className="bi bi-hourglass-split me-2"></i> Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save me-2"></i> Submit
                      </>
                    )}
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
