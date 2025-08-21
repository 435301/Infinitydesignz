import React from "react";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import Logo from "../../img/logo.svg";
import "../../css/user/success.css";
import "../../css/user/bootstrap-icons.css";
import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const {id} = useParams();
  const handleContinueShopping = () => {
    window.location.href = "/cart";
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <section className="success-section" style={{
        background: "linear-gradient(to bottom, #f9f9f9, #e8f0f0)",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="success-container" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          width: "100%"
        }}>
          <div className="success-card" style={{
            background: "#ffffff",
            borderRadius: "25px",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e0e7e7",
            width: "100%",
            maxWidth: "600px",
            overflow: "hidden",
            padding: "40px"
          }}>
            <div className="content-section" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}>
              <i className="bi bi-check-circle-fill success-icon" style={{
                fontSize: "50px",
                color: "#2ecc71",
                marginBottom: "20px",
                animation: "pulse 1.5s infinite"
              }}></i>
              <h3 style={{
                fontFamily: "'Poppins', 'Arial', sans-serif",
                fontSize: "28px",
                fontWeight: "600",
                color: "#1a2e2e",
                marginBottom: "20px"
              }}>
                Order Success
              </h3>
              <div className="success-info" style={{
                fontFamily: "'Open Sans', 'Arial', sans-serif",
                fontSize: "16px",
                color: "#1a2e2e",
                marginBottom: "25px",
                lineHeight: "1.6"
              }}>
                <p>Thank you for your purchase! Your order has been successfully placed.</p>
                <p>Order Number:  #{id}</p>
                <p>You’ll receive a confirmation email soon.</p>
              </div>
              <button className="btn-shop" onClick={handleContinueShopping} style={{
                background: "#2ecc71",
                border: "none",
                padding: "10px 30px",
                fontFamily: "'Poppins', 'Arial', sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "30px",
                width: "100%",
                maxWidth: "250px",
                color: "#fff",
                transition: "all 0.3s ease",
                marginBottom: "15px"
              }}>
                Continue Shopping
              </button>
              <button className="btn-home" onClick={handleGoHome} style={{
                background: "transparent",
                border: "2px solid #2ecc71",
                color: "#2ecc71",
                padding: "10px 30px",
                fontFamily: "'Poppins', 'Arial', sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "30px",
                width: "100%",
                maxWidth: "250px",
                transition: "all 0.3s ease"
              }}>
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
