import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import Modal from "../../components/modal";
import EditIcon from "../../img/edit_icon.png";
import AdBanner from "../../img/ad-banner.png";
import Img3 from "../../img/img3.png";
import Star from "../../img/star.svg";
import Star1 from "../../img/star1.svg";
import Icon from "../../img/icon.svg";
import { fetchProfile, updateProfile } from "../../redux/actions/profileAction"; 

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { data: profile, loading } = useSelector((state) => state.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    alternateMobile: "",
    email: "",
    gender: "",
    dateOfBirth: "",
  });
   const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        alternateMobile: profile.alternateMobile || "",
        email: profile.email || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split("T")[0]
          : "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits";
    }

    if (formData.alternateMobile && !/^\d{10}$/.test(formData.alternateMobile)) {
      newErrors.alternateMobile = "Alternate mobile must be 10 digits";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return; 
    dispatch(updateProfile(formData));
    dispatch(fetchProfile()); 
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div>
        <section className="py-3">
          <div className="container shop">
            <div className="row">
              <div className="col-lg-12">
                <strong>My Account</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container shop">
            <div className="row">
              <div className="col-md-2 sidebars">
                <a href="" className="active">Profile</a>
                <a href="/orders">My Orders</a>
                <a href="/wishlist">Wishlist</a>
                <a href="/addressbook">Address book</a>
              </div>

              <div className="col-md-7">
                <div className="profile-container">
                  <div className="profile-header p-3 d-flex justify-content-between align-items-center">
                    <h2>Profile</h2>
                    <button className="edit-details-btn" onClick={() => setIsEditing(true)}>
                      <img src={EditIcon} alt="edit" style={{ width: "16px" }} /> Edit Details
                    </button>
                  </div>

                  {loading ? (
                    <p>Loading...</p>
                  ) : profile ? (
                    <div className="profile-entry">
                      {[
                        { icon: "bi-person", label: "Full Name", value: formData.name },
                        { icon: "bi-phone", label: "Mobile Number", value: formData.phone },
                        { icon: "bi-phone", label: "Alternate Mobile", value: formData.alternateMobile },
                        { icon: "bi-envelope", label: "Email ID", value: formData.email },
                        { icon: "bi-person", label: "Gender", value: formData.gender },
                        { icon: "bi-calendar", label: "Date of Birth", value: formData.dateOfBirth },
                      ].map((item, index) => (
                        <div className="profile-item" key={index}>
                          <span className="profile-icon"><i className={`bi ${item.icon}`}></i></span>
                          <div className="profile-details">
                            <p className="label">{item.label}</p>
                            <p className="value">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No profile data available.</p>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="ad-banner mb-4">
                  <img src={AdBanner} alt="Special Sale" />
                </div>

              
              </div>
            </div>
          </div>
        </section>

        {isEditing && (
          <Modal title="Edit Profile" onClose={() => setIsEditing(false)}>
            <div className="form-section">
              <div className="form-line">
                <div className="form-field">
                  <label>Name<span className="text-danger">*</span></label>
                  <input type="text" name="name" value={formData.name} className={`form-control ${errors.name ? 'is-invalid' : ''}`} onChange={handleChange} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>
              <div className="form-line">
                <div className="form-field">
                  <label>Mobile Number<span className="text-danger">*</span></label>
                  <input type="text" name="phone" value={formData.phone}  className={`form-control ${errors.phone ? 'is-invalid' : ''}`} onChange={handleChange} disabled />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="form-field">
                  <label>Alternate Mobile</label>
                  <input type="text" name="alternateMobile" value={formData.alternateMobile} className={`form-control ${errors.alternateMobile ? 'is-invalid' : ''}`} onChange={handleChange} />
                  {errors.alternateMobile && <div className="invalid-feedback">{errors.alternateMobile}</div>}
                </div>
              </div>
              <div className="form-line">
                <div className="form-field">
                  <label>Email<span className="text-danger">*</span></label>
                  <input type="email" name="email" value={formData.email} className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={handleChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-field">
                  <label>Gender<span className="text-danger">*</span></label>
                  <select name="gender" value={formData.gender} className={`form-control ${errors.gender ? 'is-invalid' : ''}`} onChange={handleChange}>
                    <option value="" disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>
              </div>
              <div className="form-line">
                <div className="form-field full-span">
                  <label>Date of Birth<span className="text-danger">*</span></label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`} onChange={handleChange} max={new Date().toISOString().split("T")[0]}/>
                   {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                </div>
              </div>
              <button className="submit-action" onClick={handleSave}>Save Details</button>
            </div>
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
}
