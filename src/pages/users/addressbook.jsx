import React, { use, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, addAddress, editAddress, deleteAddress } from '../../redux/actions/addressAction';
import '../../css/admin/style.css';
import EditAddressModal from '../../components/editAddressModal';
import DeleteModal from '../../modals/deleteModal';

export default function AddressBook() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState('Home');
  const { addresses = [] } = useSelector((state) => state.addressBook);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const toggleModal = () => setShowModal(!showModal);

  const handleTypeSelect = (type) => setSelectedType(type);

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
    setDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  return (
    <>
      <Header />
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <Link to="/"><strong>My Account</strong></Link>
            </div>
          </div>
        </div>
      </section>

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
                {addresses.map((addr) => (
                  <AddressEntry
                    key={addr.id}
                    name={addr.name}
                    addressLines={[
                      addr.flatNumber,
                      addr.buildingName,
                      addr.addressLine1,
                      addr.addressLine2,
                      `${addr.city} - ${addr.pincode}`,
                      addr.state
                    ]}
                    mobile={addr.phone}
                    label={addr.label}
                    isDefault={addr.isDefault || false}
                    onEdit={() => {
                      setSelectedAddress(addr);
                      setEditModalOpen(true);
                    }}
                    onDelete={() => {
                      setAddressToDelete(addr);
                      setDeleteModalOpen(true);
                    }}
                  />
                ))}
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
      {editModalOpen && selectedAddress && (
        <EditAddressModal addressData={selectedAddress} selectedType={selectedAddress.label} onTypeChange={handleTypeSelect} onClose={() => {
          setEditModalOpen(false)
        }}
        />
      )}
      {deleteModalOpen && addressToDelete && (
        <DeleteModal onConfirm={() => handleDelete(addressToDelete.id)} show={deleteModalOpen} onClose={() => {
          setDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        />
      )}
    </>
  );
}

function AddressEntry({ name, addressLines, mobile, label, isDefault = false, onEdit, onDelete }) {
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
          <button className="btn action-btn" onClick={onEdit}><i className="bi bi-pencil" ></i> Edit Address</button>
          {!isDefault && <button className="btn action-btn make-default-btn"><i className="bi bi-check-circle"></i> Make it Default</button>}
        </div>
        <button className="btn action-btn delete-btn" onClick={onDelete}><i className="bi bi-x"></i> Delete Address</button>
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
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    buildingName: '',
    flatNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    label: selectedType,
  });
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (!formData.flatNumber.trim()) newErrors.flatNumber = "Flat No/H.No is required";
    if (!formData.buildingName.trim()) newErrors.buildingName = "Building name is required";
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then(res => res.json())
      .then(data => setStates(data.data.states.map(s => s.name)))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India", state: selectedState })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            setCities(data.data);
          }
        })
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (value.trim() !== "") {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(addAddress(formData));
    onClose();
  };


  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData((prev) => ({ ...prev, state, city: "" }));
    if (state.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.state;
        return updatedErrors;
      });
    }
  };


  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setFormData((prev) => ({ ...prev, city }));
    if (city.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.city;
        return updatedErrors;
      });
    }
  };

  return (
    <div className="custom-modal-wrapper">
      <div className="modal-box">
        <div className="modal-top">
          <h3>Add Address</h3>
          <button className="close-icon" onClick={onClose}>× Close</button>
        </div>
        <div className="type-options">
          {types.map(type => (
            <button
              key={type}
              type="button"
              className={`type-option ${formData.label === type ? 'active' : ''}`}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  label: type,
                }))
              }
            >
              {type}
            </button>
          ))}
        </div>
        <form className="form-section">
          <div className="form-line">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-field">
              <label>Address line 1</label>
              <input
                type="text"
                className={`form-control ${errors.addressLine1 ? 'is-invalid' : ''}`}
                name="addressLine1"
                placeholder="Address line 1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
              {errors.addressLine1 && <div className="invalid-feedback">{errors.addressLine1}</div>}
            </div>
          </div>
          <div className="form-line">
            <div className="form-field">
              <label>Home/Apartment/Building Name</label>
              <input
                type="text"
                className={`form-control ${errors.buildingName ? 'is-invalid' : ''}`}
                name="buildingName"
                placeholder="Home/Apartment/Building Name"
                value={formData.buildingName}
                onChange={handleChange}
              />
              {errors.buildingName && <div className="invalid-feedback">{errors.buildingName}</div>}
            </div>
            <div className="form-field">
              <label>Address line 2</label>
              <input
                type="text"
                className={`form-control ${errors.addressLine2 ? 'is-invalid' : ''}`}
                name="addressLine2"
                placeholder="Address line 2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
              {errors.addressLine2 && <div className="invalid-feedback">{errors.addressLine2}</div>}

            </div>
          </div>
          <div className="form-line">
            <div className="form-field">
              <label>Flat No/H.No</label>
              <input
                type="text"
                className={`form-control ${errors.flatNumber ? 'is-invalid' : ''}`}
                name="flatNumber"
                placeholder="Flat No/H.No"
                value={formData.flatNumber}
                onChange={handleChange}
              />
              {errors.flatNumber && <div className="invalid-feedback">{errors.flatNumber}</div>}

            </div>
            <div className="form-field">
              <label>State</label>
              <select
                value={selectedState}
                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                onChange={handleStateChange}
              >
                <option value="" disabled>STATE</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <div className='invalid-feedback'>{errors.state}</div>}
            </div>
          </div>
          <div className="form-line">
            <div className="form-field">
              <label>Mobile Number</label>
              <input
                type="text"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}

            </div>
            <div className="form-field">
              <label>City</label>
              <select
                value={selectedCity}
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                onChange={handleCityChange}
                disabled={!selectedState}
              >
                <option value="" disabled>CITY</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>
          </div>
          <div className="form-line">
            <div className="form-field full-span">
              <label>Pin Code</label>
              <input
                type="text"
                className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                name="pincode"
                placeholder="Pin Code"
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <div className='invalid-feedback'>{errors.pincode}</div>}
            </div>
          </div>
          <button type="submit" className="submit-action" onClick={handleSubmit}>+ Add Address</button>
        </form>
      </div>
    </div>
  );
}



