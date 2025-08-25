// src/pages/user/ContactPage.jsx
import React, { useState } from "react";
import "../../css/user/userstyle.css";
import "../../css/user/bootstrap-icons.css";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    // 👉 Here you can integrate API call to backend
    console.log("Contact form submitted:", formData);

    toast.success("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col text-center">
            <h2 className="fw-bold">Contact Us</h2>
            <p className="text-muted">
              Have questions? Get in touch with us!
            </p>
          </div>
        </div>
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="mb-3">Send us a Message</h5>
            <form onSubmit={handleSubmit}>
  <div className="row">
    <div className="col-md-6 mb-3">
      <label className="form-label">Name *</label>
      <input
        type="text"
        name="name"
        className="form-control"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
      />
    </div>
    <div className="col-md-6 mb-3">
      <label className="form-label">Email *</label>
      <input
        type="email"
        name="email"
        className="form-control"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
      />
    </div>
  </div>

  <div className="mb-3">
    <label className="form-label">Mobile Number *</label>
    <input
      type="number"
      name="mobile"
      className="form-control"
      value={formData.mobile}
      onChange={handleChange}
      placeholder="Your Mobile Number"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Subject</label>
    <input
      type="text"
      name="subject"
      className="form-control"
      value={formData.subject}
      onChange={handleChange}
      placeholder="Subject"
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Message *</label>
    <textarea
      name="message"
      className="form-control"
      rows="4"
      value={formData.message}
      onChange={handleChange}
      placeholder="Your Message"
    ></textarea>
  </div>

  <button type="submit" className="btn btn-success w-100">
    Send Message
  </button>
</form>

            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="mb-3">Contact Information</h5>
              <p>
                <i className="bi bi-geo-alt-fill me-2"></i>
                123 Main Street, Your City, Country
              </p>
              <p>
                <i className="bi bi-telephone-fill me-2"></i>
                +91 98765 43210
              </p>
              <p>
                <i className="bi bi-envelope-fill me-2"></i>
                support@example.com
              </p>
              <hr />
              <h6>Find us on Map</h6>
              <div className="map-container rounded shadow-sm overflow-hidden" style={{ height: "250px" }}>
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.3643046811407!2d76.99481287481204!3d11.08169408909224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857f69b1d2cb5%3A0x8d2a52f9474afef!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
