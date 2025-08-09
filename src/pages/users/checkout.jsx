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
import { fetchCart } from "../../redux/actions/cartAction";
import BASE_URL from "../../config/config";
import PlaceOrderButton from "../../components/placeOrderButton";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { addresses = [] } = useSelector((state) => state.addressBook);
 const [selectedAddressId, setSelectedAddressId] = useState(null);
  console.log('addresses', selectedAddressId)

  const itemsFromCart = useSelector((state) => state.cart.items);
  console.log('itemsFromCart', itemsFromCart)
  const priceSummary = useSelector((state) => state.cart.priceSummary);

  // const latestOrder = orders.length > 0 ? orders[0] : null;

  const [paymentMethod, setPaymentMethod] = useState("upi");

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchOrders());
    dispatch(fetchCart());
  }, [dispatch]);

    useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.default) || addresses[0];
      setSelectedAddressId(defaultAddress?.id || defaultAddress?._id || null);
    }
  }, [addresses]);

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
                {itemsFromCart && itemsFromCart.length > 0 ? (
                  <>
                    {itemsFromCart.map((item) => {
                      const productData = item.variant || item.product;
                      return (
                        <div className="cart-item" key={item.id}>
                          <img
                            src={`${BASE_URL}${productData.imageUrl}`}
                            className="cart-item__thumbnail"
                            alt={productData.imageAlt || productData.title}
                          />
                          <div className="cart-item__info">
                            <p className="cart-item__title">{productData.title}</p>
                            <span>Brand: {productData.brand}</span>
                            <span>Qty: {item.quantity}</span>
                            <span className="cart-item__cost">
                              ₹{(productData.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Totals from priceSummary */}
                    <div className="cart-total mt-3">
                      <div className="cart-total__line">
                        <span>Subtotal</span>
                        <span>₹{priceSummary.totalAfterDiscount.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="cart-total__line">
                        <span>Shipping</span>
                        <span>₹{priceSummary.shippingFee.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="cart-total__line">
                        <span>Platform Fee</span>
                        <span>₹{priceSummary.platformFee.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="cart-total__final">
                        <strong>Total</strong>
                        <strong>₹{priceSummary.finalPayable.toLocaleString("en-IN")}</strong>
                      </div>
                      {/* <button className="main-action w-100 mt-3">Place Order</button> */}
                      <PlaceOrderButton
                        disabled={
                          !itemsFromCart.length || !selectedAddressId
                        }
                        buildOrderData={() => {
                          const items = itemsFromCart.map((item) => {
                            const productData = item.variant || item.product;
                            return {
                              productId: item.productId,
                              variantId: item.variantId || null,
                              quantity: item.quantity,
                              price: productData.price,
                              total: productData.price * item.quantity,
                            };
                          });

                          return {
                            addressId: selectedAddressId,
                            paymentMethod: paymentMethod.toUpperCase(),
                            note: "Leave at door",
                            subtotal: priceSummary.totalAfterDiscount,
                            shippingFee: priceSummary.shippingFee,
                            gst: 0,
                            totalAmount: priceSummary.finalPayable,
                            items,
                          };
                        }}
                      />
                      <div className="trust-section mt-2">
                        <i className="fas fa-lock me-2"></i>
                        Secure Checkout Powered by Infinity Designz
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                  // !loading && <p>No items in cart</p>
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
