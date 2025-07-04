import React from "react";
import '../../src/css/success.css';
import '../../src/css/style.css';
import Header from "../includes/header";
import Footer from "../includes/footer";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.svg";
import "bootstrap-icons/font/bootstrap-icons.css"; // Required for the success icon
import '../../src/css/bootstrap-icons.css';
//headerlinks
//footerlinks

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <section className="success-section">
        <div className="success-container">
          <div className="success-card">
            <div className="content-section">
              <div className="brand-logo">
                <div className="logo-text">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <i className="bi bi-check-circle-fill success-icon"></i>
              <h3>Order Success</h3>
              <div className="success-info">
                <p>Thank you for your purchase! Your order has been successfully placed.</p>
                <p>Order Number: #123456</p>
                <p>You’ll receive a confirmation email soon.</p>
              </div>
              <button className="btn-shop" onClick={() => navigate("/shop")}>
                Continue Shopping
              </button>
              <button className="btn-home" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderSuccess;
