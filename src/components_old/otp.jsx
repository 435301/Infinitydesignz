import React, { useState } from "react";
import Header from "../includes/header";
import Footer from "../includes/footer";
import '../../src/css/styles.css';
import '../../src/css/bootstrap-icons.css';
import Logo from '../../src/img/logo.svg';
//footerlinks
//headerlinks

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      alert("OTP verified!");
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    alert("New OTP sent!");
  };

  return (
    <>
      <Header />
      <section className="registration-section">
        <div className="main-container">
          <div className="verify-card">
            <div className="row g-0">
              <div className="col-md-6 left-section">
                <div className="left-section-content">
                  <h2>Verify Your OTP!</h2>
                  <p>Enter the 6-digit code sent to your mobile to complete your registration.</p>
                  <a href="/registration" className="btn-signin">Back</a>
                </div>
              </div>
              <div className="col-md-6 right-section">
                <div className="logo">
                  <div className="logo-placeholder">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>
                <h3>Enter OTP</h3>
                <div className="mb-4">
                  <label htmlFor="otp">OTP Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    maxLength={6}
                    pattern="\d{6}"
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button onClick={handleVerify} className="btn-custom">Verify OTP</button>
                <div className="resend-otp">
                  <a href="/" onClick={handleResend}>Resend OTP</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
