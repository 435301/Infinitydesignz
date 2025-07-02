import React, { useState } from "react";
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';

const CallbackForm = ({
  nameLabel = "Name",
  mobileLabel = "Mobile Number",
  namePlaceholder = "Name",
  mobilePlaceholder = "Mobile number",
  buttonText = "Get A Call Back",
  onSubmit
}) => {
  const [formData, setFormData] = useState({ name: "", mobile: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-group-custom">
        <label htmlFor="name" className="form-label-custom text-start">
          {nameLabel}
        </label>
        <input
          type="text"
          id="name"
          className="form-input-custom"
          placeholder={namePlaceholder}
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group-custom">
        <label htmlFor="mobile" className="form-label-custom text-start">
          {mobileLabel}
        </label>
        <input
          type="text"
          id="mobile"
          className="form-input-custom"
          placeholder={mobilePlaceholder}
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>

      <div className="form-group-custom" style={{ flex: "none" }}>
        <button type="submit" className="custom-button">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CallbackForm;
