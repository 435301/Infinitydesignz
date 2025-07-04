import React, { useState } from 'react';
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap.min.css';
// import Banner from '../../img/banner.png';
import Icon from '../../img/icon.svg';
import Img3 from '../../img/img3.png';
import Star from '../../img/star.svg';
import Star1 from '../../img/star1.svg';
import { Link } from 'react-router-dom';
import Header from '../../includes/header';
import Footer from '../../includes/footer';

export default function AddressBook() {
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState('Home');

  const toggleModal = () => setShowModal(!showModal);

  const handleTypeSelect = (type) => setSelectedType(type);

  return (
    <>
          <Header />
    
      {/* Breadcrumb Section */}
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <Link to="/"><strong>My Account</strong></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Account Section */}
      <section className="py-5">
        <div className="container shop">
          <div className="row">
            {/* sidebars */}
            <div className="col-md-2 sidebars">
              <Link to="/profile">Profile</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/addressbook" className="active">Address book</Link>
            </div>

            {/* Main Content */}
            <div className="col-md-7">
              <div className="address-book-container">
                <div className="address-book-header p-3">
                  <h2>Address book</h2>
                  <button className="btn add-address-btn" onClick={toggleModal}>+ Add Address</button>
                </div>

                {/* Address Entries  */}
                <AddressEntry
                  name="Chaitanya nelluri"
                  addressLines={[
                    'Flat no G3 Balaji homes plot no 201-203',
                    'Nizampet',
                    'Hyderabad - 500090',
                    'TELANGANA'
                  ]}
                  mobile="8790969134"
                  label="HOME"
                  isDefault={true}
                />

                <AddressEntry
                  name="Zen3 Info Solutions, Manjeera trinity corporate, 12th floor"
                  addressLines={['KPHB Colony', 'Hyderabad - 500072', 'Telangana']}
                  mobile="8790969134"
                  label="Office"
                />
              </div>
            </div>

            {/* Related Products and Advertisement */}
            <div className="col-md-3">
              {/* <img src={Banner} alt="Special Sale" className="img-fluid" /> */}
              <RelatedProducts />
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Modal Popup */}
      {showModal && <AddressModal selectedType={selectedType} onClose={toggleModal} onTypeChange={handleTypeSelect} />}
    </>
  );
}

function AddressEntry({ name, addressLines, mobile, label, isDefault = false }) {
  return (
    <div className="address-entry p-3">
      {isDefault && <p className="default-address-text"><strong>Default Address</strong></p>}
      <div className={`address-label ${label.toLowerCase()}`}><span>{label}</span></div>
      <div className="address-details">
        <p className="name">{name}</p>
        {addressLines.map((line, idx) => <p key={idx}>{line}</p>)}
        <p>Mobile: {mobile}</p>
      </div>
      <div className="address-actions">
        <div className="action-group">
          <button className="btn action-btn"><i className="bi bi-pencil"></i> Edit Address</button>
          {!isDefault && <button className="btn action-btn make-default-btn"><i className="bi bi-check-circle"></i> Make it Default</button>}
        </div>
        <button className="btn action-btn delete-btn"><i className="bi bi-x"></i> Delete Address</button>
      </div>
    </div>
  );
}

function RelatedProducts() {
  const products = [1, 2];
  return (
    <div className="related-products py-4">
      <h4>Related Products</h4>
      <div className="carousel-inner">
        {products.map((_, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
            <div className="card h-100 position-relative">
              <div className="discount-badge">22% off</div>
              <div className="wishlist-icon"><img src={Icon} alt="wishlist" /></div>
              <img src={Img3} className="card-img-top" alt="Sofa" />
              <div className="card-body">
                <h6 className="card-title">Andres Fabric 3 Seater Sofa In Sandy Brown Colour</h6>
                <p className="card-text"><strong>₹37,999</strong> <del>MRP ₹48,999</del></p>
                <div className="rating d-flex align-items-center mb-2">
                  {Array(4).fill().map((_, i) => <img key={i} src={Star} className="me-2" alt="star" />)}
                  <img src={Star1} className="me-2" alt="half-star" />
                  <span>4.4 | 24K</span>
                </div>
                <p className="emi-text">
                  36-Month Warranty Available<br />
                  EMI starting from ₹1,825/month<br />
                  Express Shipping in 1 day
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressModal({ selectedType, onClose, onTypeChange }) {
  const types = ['Home', 'Office', 'Other'];

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-top">
          <h3>Add Address</h3>
          <button className="close-icon" onClick={onClose}>× Close</button>
        </div>
        <div className="type-options">
          {types.map(type => (
            <button
              key={type}
              className={`type-option ${selectedType === type ? 'active' : ''}`}
              onClick={() => onTypeChange(type)}>
              {type}
            </button>
          ))}
        </div>
        <form className="form-section">
          <div className="form-line">
            <div className="form-field">
              <label>Name</label>
              <input type="text" placeholder="NAME" required />
            </div>
            <div className="form-field">
              <label>Address line 1</label>
              <input type="text" placeholder="ADDRESS LINE 1" required />
            </div>
          </div>
          <div className="form-line">
            <div className="form-field">
              <label>Home/Apartment/Building Name</label>
              <input type="text" placeholder="HOME/APARTMENT/BUILDING NAME" required />
            </div>
            <div className="form-field">
              <label>Address line 2</label>
              <input type="text" placeholder="ADDRESS LINE 2" />
            </div>
          </div>
          <div className="form-line">
            <div className="form-field">
              <label>Flat No/H.No</label>
              <input type="text" placeholder="FLAT NO/H.NO" required />
            </div>
            <div className="form-field">
              <label>City</label>
              <select required>
                <option value="" disabled selected>CITY</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>
          <div className="form-line">
            <div className="form-field">
              <label>Mobile Number</label>
              <input type="text" placeholder="MOBILE NUMBER" required />
            </div>
            <div className="form-field">
              <label>State</label>
              <select required>
                <option value="" disabled selected>STATE</option>
                <option value="Telangana">Telangana</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
          </div>
          <div className="form-line">
            <div className="form-field full-span">
              <label>Pin Code</label>
              <input type="text" placeholder="PIN CODE" required />
            </div>
          </div>
          <button type="submit" className="submit-action">+ Add Address</button>
        </form>
      </div>
    </div>
  );
}
