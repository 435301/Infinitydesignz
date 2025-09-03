import React from "react";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import Logo from "../../img/logo.svg";
import "../../css/user/order-failure.css";   // new CSS file

export default function OrderFailure() {
  const handleRetry = () => {
    window.location.href = "/checkout";
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Header />
      <section className="error-section">
        <div className="error-container">
          <div className="error-card">
            <div className="content-section">
              <i className="bi bi-exclamation-circle-fill error-icon"></i>

              <h3 className="error-title">Order Failure</h3>

              <div className="error-info">
                <p>Sorry, something went wrong. Please try again or contact our support team.</p>
                <p>
                  Error Code: <strong>#ERR789</strong>
                </p>
                <p>
                  Contact support at{" "}
                  <a href="mailto:support@furniture.com">support@furniture.com</a>
                </p>
              </div>

              <button className="btn-retry" onClick={handleRetry}>
                Try Again
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
