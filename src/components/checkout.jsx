import React, { useState } from "react";
import '../../src/css/style.css';
import '../../src/css/bootstrap-icons.css';
import Img1 from  '../../src/img/img1.png'
import Img2 from  '../../src/img/img2.png'
import { Link } from "react-router-dom";


const savedAddresses = [
  {
    id: "address1",
    name: "Amit Sharma (Home)",
    text: "Flat 101, Sunshine Apartments, Sector 15, MG Road, Near Apollo Hospital, Mumbai, Maharashtra, 400001",
    phone: "+91 98765 43210",
  },
  {
    id: "address2",
    name: "Amit Sharma (Office)",
    text: "Office No. 305, Tech Park, Andheri East, Mumbai, Maharashtra, 400069",
    phone: "+91 98765 43210",
  },
];

const CheckoutPage = () => {
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const toggleNewAddressForm = () => {
    setShowNewAddress(!showNewAddress);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Column: Address & Payment */}
        <div className="col-lg-8">
          <div className="checkout-form">
            <h3>Shipping Information</h3>

            <h4 className="mb-2">Select a Saved Address</h4>
            {savedAddresses.map((addr) => (
              <div className="saved-location" key={addr.id}>
                <input type="radio" name="address" id={addr.id} defaultChecked={addr.id === "address1"} />
                <div className="location-details">
                  <div className="d-flex align-items-center">
                    <span className="location-title">{addr.name}</span>
                    <Link to="#" className="location-edit">Edit</Link>
                  </div>
                  <p className="location-text">{addr.text}</p>
                  <p className="location-text">Phone: {addr.phone}</p>
                </div>
              </div>
            ))}

            <button type="button" className="secondary-action mb-3" onClick={toggleNewAddressForm}>
              Add New Address
            </button>

            {showNewAddress && (
              <div id="newAddressForm">
                <h4>Add New Address</h4>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="field-label">Full Name</label>
                    <input type="text" className="text-field" placeholder="Amit Sharma" required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="field-label">Email Address</label>
                    <input type="email" className="text-field" placeholder="amit.sharma@example.com" required />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="field-label">Mobile Number</label>
                  <input type="tel" className="text-field" placeholder="+91 98765 43210" required />
                </div>
                <div className="mb-2">
                  <label className="field-label">Flat, House No., Company</label>
                  <input type="text" className="text-field" placeholder="Flat 101, Sunshine Apartments" required />
                </div>
                <div className="mb-2">
                  <label className="field-label">Area, Street</label>
                  <input type="text" className="text-field" placeholder="Sector 15, MG Road" required />
                </div>
                <div className="mb-2">
                  <label className="field-label">Landmark (Optional)</label>
                  <input type="text" className="text-field" placeholder="Near Apollo Hospital" />
                </div>
                <div className="location-layout">
                  <div className="location-box mb-2">
                    <label className="field-label">Town/City</label>
                    <input type="text" className="text-field" placeholder="Mumbai" required />
                  </div>
                  <div className="location-box mb-2">
                    <label className="field-label">State</label>
                    <select className="dropdown-field" required>
                      <option value="">Select State</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                    </select>
                  </div>
                  <div className="location-box mb-2">
                    <label className="field-label">Pincode</label>
                    <input type="text" className="text-field" placeholder="400001" required />
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Options */}
            <h3 className="mt-4 mb-3">Delivery Options</h3>
            <div className="shipping-methods">
              {["standard", "express", "pickup"].map((method) => (
                <div className="shipping-method" key={method}>
                  <input type="radio" name="delivery" id={method} defaultChecked={method === "standard"} />
                  <label htmlFor={method}>
                    {method === "standard" && "Standard Delivery (7–10 Days) - ₹499"}
                    {method === "express" && "Express Delivery (3–5 Days) - ₹999"}
                    {method === "pickup" && "Store Pickup (Free)"}
                  </label>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <h3 className="mt-4 mb-3">Payment Method</h3>
            {["upi", "creditCard", "netBanking", "emi", "wallet", "cod"].map((method) => (
              <div className="payment-method" key={method}>
                <input
                  type="radio"
                  name="payment"
                  id={method}
                  value={method}
                  checked={paymentMethod === method}
                  onChange={handlePaymentChange}
                />
                <label htmlFor={method}>
                  {{
                    upi: "UPI",
                    creditCard: "Credit/Debit Card",
                    netBanking: "Net Banking",
                    emi: "EMI (No Cost EMI Available)",
                    wallet: "Wallets (Paytm, Amazon Pay, etc.)",
                    cod: "Cash on Delivery (₹100 Extra)",
                  }[method]}
                </label>
              </div>
            ))}

            {/* Conditional Payment Fields */}
            {paymentMethod === "creditCard" && (
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
            )}
            {paymentMethod === "upi" && (
              <div id="upiDetails" className="mt-3">
                <label className="field-label">UPI ID</label>
                <input type="text" className="text-field" placeholder="yourname@upi" />
              </div>
            )}
            {paymentMethod === "emi" && (
              <div id="emiDetails" className="mt-3">
                <label className="field-label">Select EMI Plan</label>
                <select className="dropdown-field">
                  <option>Select EMI Plan</option>
                  <option>3 Months – ₹12,499/month</option>
                  <option>6 Months – ₹6,250/month</option>
                </select>
              </div>
            )}
            {paymentMethod === "netBanking" && (
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
            )}
            {paymentMethod === "wallet" && (
              <div className="mt-3">
                <label className="field-label">Select Wallet</label>
                <select className="dropdown-field">
                  <option>Select Wallet</option>
                  <option>Paytm</option>
                  <option>Amazon Pay</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="col-lg-4">
          <div className="cart-details">
            <h3>Order Summary</h3>
            {/* Repeatable cart item */}
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
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
