import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp } from "../redux/actions/userAuthAction";
import Logo from "../../src/img/logo.svg";
import "../css/user/userstyle.css";
import { syncGuestCartToUserCart } from "../redux/actions/cartAction";
import { toast } from "react-toastify";

const OtpLoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth);

  const validateForm = () => {
    let newErrors = {};
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setMobile(e.target.value)
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSendOtp = () => {
    if (!validateForm()) return;
    if (!mobile) {
      toast.error('Please enter the mobile number');
      return;
    }
    if (!agreeTerms) {
      toast.error('Please accept the T&C');
      return;
    }
    setLoading(true);
    dispatch(sendOtp(mobile))
      .then(() => setStep(2))
      .finally(() => setLoading(false));
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    dispatch(verifyOtp(mobile, otp))
      .then(() => {
        dispatch(syncGuestCartToUserCart());
        if (onLoginSuccess) onLoginSuccess();
        onClose();
      })
      .finally(() => setLoading(false));
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop custom-modal-backdrop">
      <div className="custom-modal-vertical p-4">
        {/* Logo and Banner Text */}
        <div className="text-center mb-4">
          <img src={Logo} alt="Logo" style={{ width: 80 }} />
          <h3 className="mt-3">
            {step === 1 ? "Register with OTP" : "Enter OTP"}
          </h3>
          <p className="text-muted">
            Register now to explore premium furniture collections and enjoy tailored offers.
          </p>
        </div>

        {/* Form Section */}
        <div>
          {step === 1 ? (
            <>
              <div className="mb-3">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                  id="mobile"
                  placeholder="Mobile Number"
                  value={mobile}
                  // onChange={(e) => setMobile(e.target.value)}
                  onChange={handleChange}
                />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the{" "}
                  <a href="/termsandconditions" target="_blank" rel="noreferrer">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                className="btn btn-custom w-100"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
              <button
                className="btn btn-success w-100"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          <button
            className="btn btn-link text-danger w-100 mt-3"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpLoginModal;
