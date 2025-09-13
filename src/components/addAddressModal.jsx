import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress } from '../redux/actions/addressAction';
import { City, State } from "country-state-city";
import { toast } from 'react-toastify';

function AddressModal({ selectedType, onClose, onTypeChange ,addresses}) {
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
    label: selectedType || "Home",
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
    const allStates = State.getStatesOfCountry("IN"); // India
    setStates(allStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const stateObj = states.find(s => s.name === selectedState);
      if (stateObj) {
        const allCities = City.getCitiesOfState("IN", stateObj.isoCode);
        setCities(allCities);
      }
    }
  }, [selectedState, states]);

  useEffect(() => {
    if (selectedType) {
      setFormData((prev) => ({ ...prev, label: selectedType }));
    }
  }, [selectedType]);

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
     const isDuplicate = addresses.some(addr => 
    addr.name === formData.name &&
    addr.flatNumber === formData.flatNumber &&
    addr.buildingName === formData.buildingName &&
    addr.addressLine1 === formData.addressLine1 &&
    addr.addressLine2 === formData.addressLine2 &&
    addr.city === formData.city &&
    addr.state === formData.state &&
    addr.pincode === formData.pincode &&
    addr.phone === formData.phone
  );
  if (isDuplicate) {
    toast.error("This address already exists under another type. Please use a different address.");
    return;
  }
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
               onClick={() => {
        // reset form when changing type
        setFormData({
          name: '',
          buildingName: '',
          flatNumber: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          pincode: '',
          phone: '',
          label: type,   // set the new type
        });
        setSelectedState("");
        setSelectedCity("");
        setErrors({});
      }}
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
                  <option key={state.isoCode} value={state.name}>
                    {state.name}
                  </option>
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
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
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

export default AddressModal;