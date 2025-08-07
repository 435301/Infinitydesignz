import { Link } from "react-router-dom";
import "../../css/user/userstyle.css";
import Img1 from "../../img/img1.png";
import Img2 from "../../img/img2.png";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { fetchAddresses } from "../../redux/actions/addressAction";
import AddressModal from "../../components/addAddressModal";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchOrders } from "../../redux/actions/orderAction";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const addresses = useSelector(
    (state) => state.addressBook.addresses || [],
    shallowEqual
  );

  const { orders = [], loading, error } = useSelector((state) => state.order);
  const latestOrder = orders.length > 0 ? orders[0] : null;

  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (latestOrder?.addressId) {
      const match = addresses.find(addr => addr.id === latestOrder.addressId);
      if (match) {
        setSelectedAddressId(latestOrder.addressId);
      }
    }
  }, [latestOrder]);

  console.log("latestOrder.address.id", latestOrder?.addressId);


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

  return (
    <>
      <Header />
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <strong>Checkout</strong>
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
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-lg-4">
              <div className="cart-details">
                <h3>Order Summary</h3>

                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}

                {latestOrder ? (
                  <>
                    {latestOrder.items.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <img
                          src={`/images/products/${item.productId}.jpg`}
                          className="cart-item__thumbnail"
                          alt={`Product ${item.productId}`}
                        />
                        <div className="cart-item__info">
                          <p className="cart-item__title">Product #{item.productId}</p>
                          <span>Qty: {item.quantity}</span>
                          <span className="cart-item__cost">₹{item.total}</span>
                        </div>
                      </div>
                    ))}

                    <div className="cart-total mt-3">
                      <div className="cart-total__line">
                        <span>Subtotal</span>
                        <span>₹{latestOrder.subtotal}</span>
                      </div>
                      <div className="cart-total__line">
                        <span>Shipping</span>
                        <span>₹{latestOrder.shippingFee}</span>
                      </div>
                      <div className="cart-total__line">
                        <span>GST (18%)</span>
                        <span>₹{latestOrder.gst}</span>
                      </div>
                      <div className="cart-total__final">
                        <strong>Total</strong>
                        <strong>₹{latestOrder.totalAmount}</strong>
                      </div>
                      <button className="main-action w-100 mt-3">Place Order</button>
                      <div className="trust-section mt-2">
                        <i className="fas fa-lock me-2"></i>
                        Secure Checkout Powered by Infinity Designz
                      </div>
                    </div>
                  </>
                ) : (
                  !loading && <p>No order found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
