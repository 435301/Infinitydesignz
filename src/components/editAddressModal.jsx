import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editAddress } from '../redux/actions/addressAction';
import '../css/user/userstyle.css';
import { toast } from 'react-toastify';

function EditAddressModal({ addressData, onClose }) {
  const types = ["Home", "Office", "Other"];
  const dispatch = useDispatch();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedType, setSelectedType] = useState(addressData?.label || "Home");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    Home: {
      name: "",
      buildingName: "",
      flatNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    },
    Office: {
      name: "",
      buildingName: "",
      flatNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    },
    Other: {
      name: "",
      buildingName: "",
      flatNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    },
  });

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then((res) => res.json())
      .then((data) => setStates(data.data.states.map((s) => s.name)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India", state: selectedState }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) setCities(data.data);
        })
        .catch((err) => console.error(err));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (addressData) {
      const label = addressData.label || "Home";
      setSelectedType(label);

      setFormData((prev) => ({
        ...prev,
        [label]: {
          name: addressData.name || "",
          buildingName: addressData.buildingName || "",
          flatNumber: addressData.flatNumber || "",
          addressLine1: addressData.addressLine1 || "",
          addressLine2: addressData.addressLine2 || "",
          city: addressData.city || "",
          state: addressData.state || "",
          pincode: addressData.pincode || "",
          phone: addressData.phone || "",
        },
      }));
      setSelectedState(addressData.state || "");
      setSelectedCity(addressData.city || "");
    }
  }, [addressData]);

  const currentForm = formData[selectedType];

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedState(formData[type].state || "");
    setSelectedCity(formData[type].city || "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [selectedType]: {
        ...prev[selectedType],
        [name]: value,
      },
    }));

    if (value.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setFormData((prev) => ({
      ...prev,
      [selectedType]: {
        ...prev[selectedType],
        state,
        city: "",
      },
    }));

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
    setFormData((prev) => ({
      ...prev,
      [selectedType]: {
        ...prev[selectedType],
        city,
      },
    }));

    if (city.trim() !== "") {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.city;
        return updatedErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentForm.name.trim()) newErrors.name = "Name is required";
    if (!currentForm.phone.trim()) newErrors.phone = "Mobile number is required";
    else if (!/^\d{10}$/.test(currentForm.phone)) newErrors.phone = "Mobile number must be 10 digits";

    if (!currentForm.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(currentForm.pincode)) newErrors.pincode = "Pincode must be 6 digits";

    if (!currentForm.flatNumber.trim()) newErrors.flatNumber = "Flat No/H.No is required";
    if (!currentForm.buildingName.trim()) newErrors.buildingName = "Building name is required";
    if (!currentForm.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required";
    if (!currentForm.city.trim()) newErrors.city = "City is required";
    if (!currentForm.state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Dispatch the current type's data
    dispatch(editAddress(addressData?.id, { ...currentForm, label: selectedType }));
    onClose();
  };

  return (
    <div className="custom-modal-wrapper">
      <div className="modal-box">
        <div className="modal-top">
          <h3>Edit Address</h3>
          <button className="close-icon" onClick={onClose}>× Close</button>
        </div>

        <div className="type-options">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              className={`type-option ${selectedType === type ? "active" : ""}`}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <form className="form-section" onSubmit={handleSubmit}>
          <div className="form-line">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Name"
                value={currentForm.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-field">
              <label>Address line 1</label>
              <input
                type="text"
                name="addressLine1"
                className={`form-control ${errors.addressLine1 ? "is-invalid" : ""}`}
                placeholder="Address line 1"
                value={currentForm.addressLine1}
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
                name="buildingName"
                className={`form-control ${errors.buildingName ? "is-invalid" : ""}`}
                placeholder="Home/Apartment/Building Name"
                value={currentForm.buildingName}
                onChange={handleChange}
              />
              {errors.buildingName && <div className="invalid-feedback">{errors.buildingName}</div>}
            </div>
            <div className="form-field">
              <label>Address line 2</label>
              <input
                type="text"
                name="addressLine2"
                className={`form-control ${errors.addressLine2 ? "is-invalid" : ""}`}
                placeholder="Address line 2"
                value={currentForm.addressLine2}
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
                name="flatNumber"
                className={`form-control ${errors.flatNumber ? "is-invalid" : ""}`}
                placeholder="Flat No/H.No"
                value={currentForm.flatNumber}
                onChange={handleChange}
              />
              {errors.flatNumber && <div className="invalid-feedback">{errors.flatNumber}</div>}
            </div>
            <div className="form-field">
              <label>State</label>
              <select
                value={selectedState}
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                onChange={handleStateChange}
              >
                <option value="" disabled>
                  STATE
                </option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>
          </div>

          <div className="form-line">
            <div className="form-field">
              <label>Mobile Number</label>
              <input
                type="text"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Mobile Number"
                value={currentForm.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="form-field">
              <label>City</label>
              <select
                value={selectedCity}
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                onChange={handleCityChange}
                disabled={!selectedState}
              >
                <option value="" disabled>
                  CITY
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
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
                name="pincode"
                className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                placeholder="Pin Code"
                value={currentForm.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
            </div>
          </div>

          <button type="submit" className="submit-action">
            Update Address
          </button>
        </form>
      </div>
    </div>
  );
}


export default EditAddressModal;