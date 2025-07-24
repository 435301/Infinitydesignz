import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap-icons.css';
import '../../css/user/bootstrap.min.css';
import Header from '../../includes/header';
import Footer from '../../includes/footer';
import EditIcon from '../../img/edit_icon.png';
import AdBanner from '../../img/ad-banner.png';
import Img3 from '../../img/img3.png';
import Star from '../../img/star.svg';
import Star1 from '../../img/star1.svg';
import Logo from '../../img/logo.svg';
import Icon from '../../img/icon.svg';
import Modal from '../../components/modal';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Chaitanya Nelluri',
    mobile: '8790969134',
    altMobile: '9848887252',
    email: 'kits.chaithu007@gmail.com',
    gender: 'Male',
    dob: '1992-07-06',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div>
        {/* Breadcrumb */}
        <section className="bg-light py-3">
          <div className="container shop">
            <div className="row">
              <div className="col-lg-12">
                <strong>My Account</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-5">
          <div className="container shop">
            <div className="row">

              {/* sidebars */}
              <div className="col-md-2 sidebars">
                <a href="" className="active">Profile</a>
                <a href="/orders">Orders</a>
                <a href="/wishlist">Wishlist</a>
                <a href="/addressbook">Address book</a>
              </div>

              {/* Profile Content */}
              <div className="col-md-7">
                <div className="profile-container">
                  <div className="profile-header p-3 d-flex justify-content-between align-items-center">
                    <h2>Profile</h2>
                    <button className=" edit-details-btn" onClick={() => setIsEditing(true)}>
                      <img src={EditIcon} alt="edit" style={{ width: '16px' }} /> Edit Details
                    </button>
                  </div>

                  <div className="profile-entry">
                    {[
                      { icon: 'bi-person', label: 'Full Name', value: formData.name },
                      { icon: 'bi-phone', label: 'Mobile Number', value: formData.mobile },
                      { icon: 'bi-phone', label: 'Alternate Mobile', value: formData.altMobile },
                      { icon: 'bi-envelope', label: 'Email ID', value: formData.email },
                      { icon: 'bi-person', label: 'Gender', value: formData.gender },
                      { icon: 'bi-calendar', label: 'Date of Birth', value: formData.dob },
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
                </div>
              </div>

              {/* Right Column: Ad + Related Products */}
              <div className="col-md-3">
                <div className="ad-banner mb-4">
                  <img src={AdBanner} alt="Special Sale" />
                </div>

                <div className="related-products py-4">
                  <h4>Related Products</h4>
                  {/* Simulate Carousel */}
                  {[1].map((item, index) => (
                    <div className="card mb-2" key={index}>
                      <div className="discount-badge">22% off</div>
                      <div className="wishlist-icon"><img src={Icon} alt="Wishlist" /></div>
                      <img src={Img3} className="card-img-top" alt="Sofa" />
                      <div className="card-body">
                        <h6 className="card-title">Andres Fabric 3 Seater Sofa In Sandy Brown Colour</h6>
                        <p className="card-text"><strong>₹37,999</strong> <del>MRP ₹48,999</del></p>
                        <div className="rating d-flex align-items-center mb-2">
                          {[...Array(4)].map((_, i) => <img key={i} src={Star} className="me-2" alt="*" />)}
                          <img src={Star1} className="me-2" alt="*" /><span>4.4 | 24K</span>
                        </div>
                        <p className="emi-text">
                          36-Month Warranty Available<br />
                          EMI starting from ₹1,825/month<br />
                          Express Shipping in 1 day
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Edit Profile Modal */}
        {/* {isEditing && (
         <div className="custom-modal-wrapper d-flex justify-content-center align-items-center">
            <div className="modal-box">
              <div className="modal-top d-flex justify-content-between">
                <h3>Edit Profile</h3>
                <button className="close-icon" onClick={() => setIsEditing(false)}>× Close</button>
              </div>
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
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>Alternate Mobile</label>
                    <input type="text" name="altMobile" value={formData.altMobile} onChange={handleChange} />
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
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>
                </div>
                <button className="submit-action" onClick={() => setIsEditing(false)}>Save Details</button>
              </div>
            </div>
          </div>
        )} */}
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
                  <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label>Alternate Mobile</label>
                  <input type="text" name="altMobile" value={formData.altMobile} onChange={handleChange} />
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
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>
              </div>
              <button className="submit-action" onClick={() => setIsEditing(false)}>Save Details</button>
            </div>
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
}
