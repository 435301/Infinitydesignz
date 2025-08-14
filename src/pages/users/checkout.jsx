import { Link } from "react-router-dom";
import "../../css/user/userstyle.css";
import Img1 from "../../img/img1.png";
import Img2 from "../../img/img2.png";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { fetchAddresses } from "../../redux/actions/addressAction";
import AddressModal from "../../components/addAddressModal";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/actions/orderAction";
import { applyCoupon, fetchCart } from "../../redux/actions/cartAction";
import BASE_URL from "../../config/config";
import PlaceOrderButton from "../../components/placeOrderButton";
import { applyCouponBuyNow } from "../../redux/actions/buyNowAction";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { addresses = [] } = useSelector((state) => state.addressBook);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [displayItems, setDisplayItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [promoCode, setPromoCode] = useState("");
  const itemsFromCart = useSelector((state) => state.cart.items) || [];
  const { buyNow } = useSelector((state) => state.buyNow);
  const cart = useSelector((state) => state.cart);
  const reduxBuyNowPriceSummary = useSelector((state) => state.buyNow.priceSummary) || {};
  const reduxCartPriceSummary = useSelector((state) => state.cart.priceSummary) || {};

  const buyNowItems = buyNow?.items || [];
  const isBuyNow = buyNowItems.length > 0;

  const priceSummary = isBuyNow
    ? (Object.keys(reduxBuyNowPriceSummary).length > 0
      ? reduxBuyNowPriceSummary
      : (buyNow?.priceSummary || {}))
    : (Object.keys(reduxCartPriceSummary).length > 0
      ? reduxCartPriceSummary
      : (cart?.priceSummary || {}));

  // const cartCoupon = useSelector((state) => state.cart.appliedCoupon);
  // const Buynowcoupon = useSelector((state) => state.buyNow.coupon);
  const cartCoupon = useSelector(state => state.cart.appliedCoupon);
  const buyNowCoupon = useSelector(state => state.buyNow.coupon);

  const coupon = isBuyNow ? buyNowCoupon : cartCoupon;



  console.log('cartCoupon', cartCoupon)
  console.log('Buynowcoupon', buyNowCoupon)

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchOrders());
    dispatch(fetchCart());
  }, [dispatch]);

  // Select default address
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.default) || addresses[0];
      setSelectedAddressId(defaultAddress?.id || defaultAddress?._id || null);
    }
  }, [addresses]);

  // Display items logic (Buy Now or Cart)
  useEffect(() => {
    if (buyNow?.items?.length > 0) {
      // Buy Now mode
      setDisplayItems(
        buyNow.items.map((item) => {
          const source = item.variant || item.product || {};
          return {
            id: item.id,
            productId: item.productId,
            variantId: item.variantId || null,
            quantity: item.quantity || 1,
            product: {
              title: source.title || "Untitled Product",
              brand: source.brand || "N/A",
              price: source.price || 0,
              mrp: source.mrp || 0,
              size: source.size || "M",
              imageUrl: source.imageUrl || "/placeholder.jpg",
              delivery: "13 Aug",
            },
          };
        })
      );
    } else if (itemsFromCart.length > 0) {
      // Cart mode
      setDisplayItems(
        itemsFromCart.map((item) => {
          const source = item.variant || item.product || {};
          return {
            ...item,
            quantity: item.quantity || 1,
            product: {
              title: source.title || "Untitled Product",
              brand: source.brand || "N/A",
              price: source.price || 0,
              mrp: source.mrp || 0,
              size: source.size || "M",
              imageUrl: source.imageUrl || "/placeholder.jpg",
              delivery: "13 Aug",
            },
          };
        })
      );
    }
  }, [buyNow, itemsFromCart]);

  const handlePaymentChange = useCallback((e) => {
    setPaymentMethod(e.target.value);
  }, []);

  const handleAddressSelect = useCallback((id) => {
    setSelectedAddressId(id);
  }, []);

  const handleApplyCoupon = () => {
    if (!promoCode.trim()) return;

    if (isBuyNow) {
      dispatch(
        applyCouponBuyNow({
          code: promoCode,
          productId: displayItems[0]?.productId,
          variantId: displayItems[0]?.variantId || null,
          quantity: displayItems[0]?.quantity || 1,
        })
      );
    } else {
      dispatch(
        applyCoupon({
          code: promoCode,
        })
      );
    }
  };

  const handleRemoveCoupon = () => {
    setPromoCode("");
  };

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
                  <div className="saved-location" key={addr.id || addr._id}>
                    <input
                      type="radio"
                      name="address"
                      id={`address-${addr.id || addr._id}`}
                      checked={selectedAddressId === (addr.id || addr._id)}
                      onChange={() => handleAddressSelect(addr.id || addr._id)}
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
                {displayItems.length > 0 && (
                  <>
                    {displayItems.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <img
                          src={`${BASE_URL}${item.product.imageUrl}`}
                          className="cart-item__thumbnail"
                          alt={item.product.title}
                        />
                        <div className="cart-item__info">
                          <p className="cart-item__title">{item.product.title}</p>
                          <span>Brand: {item.product.brand}</span>
                          <span>Qty: {item.quantity}</span>
                          <span className="cart-item__cost">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Coupon */}
                    <div className="coupon-section">
                      <input
                        type="text"
                        className="coupon-section__field"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button
                        type="button"
                        className="coupon-section__action"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </button>
                      {coupon && (
                        <button
                          type="button"
                          className="coupon-section__remove"
                          onClick={handleRemoveCoupon}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>

                    {/* Totals */}
                    <div className="cart-total mt-3">
                      <div className="cart-total__line">
                        <span>Subtotal</span>
                        <span>₹{priceSummary.totalAfterDiscount?.toLocaleString("en-IN")}</span>
                      </div>

                      {priceSummary?.couponDiscount > 0 && (
                        <div className="cart-total__line">
                          <span>Discount</span>
                          <span>- ₹{priceSummary.couponDiscount.toLocaleString("en-IN")}</span>
                        </div>
                      )}


                      <div className="cart-total__line">
                        <span>Shipping</span>
                        <span>₹{priceSummary.shippingFee?.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="cart-total__line">
                        <span>Platform Fee</span>
                        <span>₹{priceSummary.platformFee?.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="cart-total__final">
                        <strong>Total</strong>
                        <strong>
                          ₹{(priceSummary.finalPayable - (coupon?.discount || 0))
                            .toLocaleString("en-IN")}
                        </strong>
                      </div>

                      <PlaceOrderButton
                        mode={isBuyNow ? "buyNow" : "cart"}
                        disabled={(!itemsFromCart.length && !buyNowItems.length) || !selectedAddressId}
                        selectedAddressId={selectedAddressId}
                        paymentMethod={paymentMethod}
                        cartItems={itemsFromCart}
                        buyNowProduct={buyNowItems[0]}
                        priceSummary={priceSummary}
                        appliedCoupon={coupon}
                      />


                      <div className="trust-section mt-2">
                        <i className="fas fa-lock me-2"></i>
                        Secure Checkout Powered by Infinity Designz
                        <strong>
                          ₹{(priceSummary.finalPayable - (coupon?.discount || 0))
                            .toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>

                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />

      {showModal && (
        <AddressModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CheckoutPage;
