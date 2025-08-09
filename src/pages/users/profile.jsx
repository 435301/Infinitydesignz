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

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div>
        <section className="bg-light py-3">
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
                <a href="/orders">Orders</a>
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

                <div className="related-products py-4">
                  <h4>Related Products</h4>
                  {[1].map((_, index) => (
                    <div className="card mb-2" key={index}>
                      <div className="discount-badge">22% off</div>
                      <div className="wishlist-icon"><img src={Icon} alt="Wishlist" /></div>
                      <img src={Img3} className="card-img-top" alt="Sofa" />
                      <div className="card-body">
                        <h6 className="card-title">Andres Fabric 3 Seater Sofa</h6>
                        <p className="card-text"><strong>₹37,999</strong> <del>MRP ₹48,999</del></p>
                        <div className="rating d-flex align-items-center mb-2">
                          {[...Array(4)].map((_, i) => <img key={i} src={Star} className="me-2" alt="*" />)}
                          <img src={Star1} className="me-2" alt="*" /><span>4.4 | 24K</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <label>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
              </div>
              <div className="form-line">
                <div className="form-field">
                  <label>Mobile Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label>Alternate Mobile</label>
                  <input type="text" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} />
                </div>
              </div>
              <div className="form-line">
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="" disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-line">
                <div className="form-field full-span">
                  <label>Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
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
