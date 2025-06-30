import React from "react";
import "../../src/css/failure.css";
import '../../src/css/style.css';
import '../../src/css/bootstrap-icons.css';
import { FaExclamationCircle } from "react-icons/fa";

const OrderFailurePage = () => {
  return (
    <section className="error-section">
      <div className="error-container">
        <div className="error-card">
          <div className="content-section">
            <FaExclamationCircle className="error-icon" />
            <h3>Order Failure</h3>
            <div className="error-info">
              <p>Sorry, something went wrong. Please try again or contact our support team.</p>
              <p>Error Code: <strong>#ERR789</strong></p>
              <p>
                Contact support at{" "}
                <a href="mailto:support@furniture.com">support@furniture.com</a>
              </p>
            </div>
            <button className="btn-retry" onClick={() => window.location.href = "/checkout"}>
              Try Again
            </button>
            <button className="btn-home" onClick={() => window.location.href = "/"}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderFailurePage;
