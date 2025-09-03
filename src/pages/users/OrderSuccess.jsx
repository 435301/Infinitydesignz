import React from "react";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import "../../css/user/order-success.css";  // new CSS file
import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  const handleContinueShopping = () => {
    window.location.href = "/";
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <section className="success-section">
        <div className="success-container">
          <div className="success-card">
            <div className="content-section">
              <i className="bi bi-check-circle-fill success-icon"></i>

              <h3 className="success-title">Order Success</h3>

              <div className="success-info">
                <p>Thank you for your purchase! Your order has been successfully placed.</p>
                <p>Order Number: #{id}</p>
                <p>You’ll receive a confirmation email soon.</p>
              </div>

              <button className="btn-shop" onClick={handleContinueShopping}>
                Continue Shopping
              </button>

              <button className="btn-home" onClick={handleGoHome}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
