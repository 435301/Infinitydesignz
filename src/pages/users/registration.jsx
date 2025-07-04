import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../includes/header';
import Footer from '../includes/footer';
import '../../src/css/styles.css';
import '../../src/css/bootstrap-icons.css';
import Logo from '../../src/img/logo.svg';
//headerlinks
//footerlinks

export default function RegisterWithOtp() {
  const [mobile, setMobile] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleMobileChange = (e) => setMobile(e.target.value);
  const handleTermsChange = (e) => setAgreeTerms(e.target.checked);

  return (
    <>
      <Header />

      <section className="registration-section">
        <div className="main-container">
          <div className="register-card">
            <div className="row g-0">
              {/* Left Section */}
              <div className="col-md-6 left-section d-flex align-items-center justify-content-center">
                <div className="left-section-content text-center p-4">
                  <h2>Create Your Space!</h2>
                  <p>
                    Register now to explore premium furniture collections and enjoy tailored offers.
                  </p>
                  {/* <button className="btn-signin">Sign In</button> */}
                </div>
              </div>

              {/* Right Section */}
              <div className="col-md-6 right-section p-4">
                <div className="logo text-center mb-3">
                  <div className="logo-placeholder">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>
                <h3 className="text-center mb-4">Register with OTP</h3>
                <div className="mb-4">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={handleMobileChange}
                    required
                  />
                </div>
                <div className="terms-checkbox mb-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={handleTermsChange}
                    required
                  />
                  <label htmlFor="terms">
                    I agree to the{' '}
                    <Link to="/termsandconditions">Terms and Conditions</Link>
                  </label>
                </div>
                <Link
                  to={agreeTerms && mobile ? "/otp" : "#"}
                  className="btn btn-custom w-100"
                  onClick={(e) => {
                    if (!agreeTerms || !mobile) {
                      e.preventDefault();
                      alert("Please enter mobile number and accept terms.");
                    }
                  }}
                >
                  Send OTP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
