
import { Link } from "react-router-dom";
import "../../css/user/userstyle.css"
import Img1 from "../../img/img1.png";
import Img2 from "../../img/img2.png";
import Header from "../../includes/header"; 
import Footer from "../../includes/footer";
import { fetchAddresses } from "../../redux/actions/addressAction";
import AddressModal from "../../components/addAddressModal";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const addresses = useSelector(
    (state) => state.addressBook.addresses || [],
    shallowEqual
  );
  const [paymentMethod, setPaymentMethod] = useState("upi");

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handlePaymentChange = useCallback((e) => {
    setPaymentMethod(e.target.value);
  }, []);

  const handleAddressSelect = useCallback((id) => {
    setSelectedAddressId(id);
  }, []);

  const paymentOptions = useMemo(
    () => [
      { value: "upi", label: "UPI" },
      { value: "creditCard", label: "Credit/Debit Card" },
      { value: "netBanking", label: "Net Banking" },
      { value: "emi", label: "EMI (No Cost EMI Available)" },
      { value: "wallet", label: "Wallets (Paytm, Amazon Pay, etc.)" },
      { value: "cod", label: "Cash on Delivery (₹100 Extra)" },
    ],
    []
  );

  // const deliveryOptions = useMemo(
  //   () => [
  //     { value: "standard", label: "Standard Delivery (7–10 Days) - ₹499" },
  //     { value: "express", label: "Express Delivery (3–5 Days) - ₹999" },
  //     { value: "pickup", label: "Store Pickup (Free)" },
  //   ],
  //   []
  // );

  return (
    <>
      <Header />
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <a href="">
                <strong>Checkout</strong>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="main-wrapper">
        <div className="container my-5">
          <div className="row">
            {/* LEFT COLUMN */}
            <div className="col-lg-8">
              <div className="checkout-form">
                <h3>Shipping Information</h3>
                <h4 className="mb-2">Select a Saved Address</h4>
                {addresses.map((addr) => (
                  <div className="saved-location" key={addr.id}>
                    <input
                      type="radio"
                      name="address"
                      id={`address-${addr.id}`}
                      checked={selectedAddressId === addr.id}
                      onChange={() => handleAddressSelect(addr.id)}
                    />
                    <div className="location-details">
                      <div className="d-flex align-items-center">
                        <span className="location-title">
                          {addr.name} ({addr.label})
                        </span>
                      </div>
                      <p className="location-text">
                        {addr.flatNumber}, {addr.buildingName}, {addr.addressLine1}, {addr.addressLine2}
                      </p>
                      <p className="location-text">
                        {addr.city}, {addr.state}, {addr.pincode}
                      </p>
                      <p className="location-text">Phone: {addr.phone}</p>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="secondary-action mb-3"
                  onClick={() => setShowModal(true)}
                >
                  + Add New Address
                </button>
                {/* Delivery Options */}
                {/* <h3 className="mt-4 mb-3">Delivery Options</h3> */}
                {/* <div className="shipping-methods">
                  {deliveryOptions.map((method) => (
                    <div className="shipping-method" key={method.value}>
                      <input
                        type="radio"
                        name="delivery"
                        id={method.value}
                        defaultChecked={method.value === "standard"}
                      />
                      <label htmlFor={method.value}>{method.label}</label>
                    </div>
                  ))}
                </div> */}
                {/* Payment Method */}
                {/* <h3 className="mt-4 mb-3">Payment Method</h3> */}
                {/* {paymentOptions.map((method) => (
                  <div className="payment-method" key={method.value}>
                    <input
                      type="radio"
                      name="payment"
                      id={method.value}
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor={method.value}>{method.label}</label>
                  </div>
                ))} */}
                {/* Conditional Payment Fields */}
                {/* {paymentMethod === "creditCard" && (
                  <div id="cardDetails">
                    <div className="mb-2">
                      <label className="field-label">Card Number</label>
                      <input type="text" className="text-field" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <label className="field-label">Expiry Date</label>
                        <input type="text" className="text-field" placeholder="MM/YY" />
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="field-label">CVV</label>
                        <input type="text" className="text-field" placeholder="123" />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="field-label">Name on Card</label>
                      <input type="text" className="text-field" placeholder="Amit Sharma" />
                    </div>
                  </div>
                )} */}
                {/* {paymentMethod === "upi" && (
                  <div id="upiDetails" className="mt-3">
                    <label className="field-label">UPI ID</label>
                    <input type="text" className="text-field" placeholder="yourname@upi" />
                  </div>
                )} */}
                {/* {paymentMethod === "emi" && (
                  <div id="emiDetails" className="mt-3">
                    <label className="field-label">Select EMI Plan</label>
                    <select className="dropdown-field">
                      <option>Select EMI Plan</option>
                      <option>3 Months – ₹12,499/month</option>
                      <option>6 Months – ₹6,250/month</option>
                    </select>
                  </div>
                )} */}
                {/* {paymentMethod === "netBanking" && (
                  <div className="mt-3">
                    <label className="field-label">Select Bank</label>
                    <select className="dropdown-field">
                      <option>Select Bank</option>
                      <option>HDFC</option>
                      <option>ICICI</option>
                      <option>SBI</option>
                      <option>Axis</option>
                    </select>
                  </div>
                )} */}
                {/* {paymentMethod === "wallet" && (
                  <div className="mt-3">
                    <label className="field-label">Select Wallet</label>
                    <select className="dropdown-field">
                      <option>Select Wallet</option>
                      <option>Paytm</option>
                      <option>Amazon Pay</option>
                    </select>
                  </div>
                )} */}
              </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="col-lg-4">
              <div className="cart-details">
                <h3>Order Summary</h3>
                <div className="cart-item">
                  <img src={Img1} className="cart-item__thumbnail" alt="Sofa" />
                  <div className="cart-item__info">
                    <p className="cart-item__title">Luxury 3-Seater Sofa</p>
                    <span>Qty: 1</span>
                    <span className="cart-item__cost">₹29,999</span>
                  </div>
                </div>
                <div className="cart-item">
                  <img src={Img2} className="cart-item__thumbnail" alt="Dining Table" />
                  <div className="cart-item__info">
                    <p className="cart-item__title">Teak Wood Dining Table</p>
                    <span>Qty: 1</span>
                    <span className="cart-item__cost">₹19,999</span>
                  </div>
                </div>
                <div className="cart-total mt-3">
                  <div className="cart-total__line">
                    <span>Subtotal</span>
                    <span>₹49,998</span>
                  </div>
                  <div className="cart-total__line">
                    <span>Shipping</span>
                    <span>₹499</span>
                  </div>
                  <div className="cart-total__line">
                    <span>GST (18%)</span>
                    <span>₹9,000</span>
                  </div>
                  <div className="cart-total__final">
                    <strong>Total</strong>
                    <strong>₹59,497</strong>
                  </div>
                  <button className="main-action w-100 mt-3">Place Order</button>
                  <div className="trust-section mt-2">
                    <i className="fas fa-lock me-2"></i>
                    Secure Checkout Powered by Infinity Designz
                  </div>
                </div>
              </div>
              {showModal && (
                <AddressModal
                  selectedType="Home"
                  onClose={() => setShowModal(false)}
                  onTypeChange={() => {}}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
