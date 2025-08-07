import React, { useState, useEffect } from "react";
import "../../css/user/cart.css";
import "../../css/user/userstyle.css";
import "../../css/user/bootstrap-icons.css";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../utils/auth";
import {
  applyCoupon,
  DeleteFromCart,
  fetchCart,
  removeCoupon,
  UpdateToCart,
} from "../../redux/actions/cartAction";
import BASE_URL from "../../config/config";
import {
  addToWishlist,
  deleteWishlistItem,
  fetchWishlist,
} from "../../redux/actions/whishlistAction";
import Loader from "../../includes/loader";
import PlaceOrderButton from "../../components/placeOrderButton";
import { fetchAddresses } from "../../redux/actions/addressAction";
import { useNavigate } from "react-router-dom";
const CartItem = ({
  id,
  product = {},
  quantity = 1,
  variantId,
  productId,
  onWishlistToggle,
  inWishlist,
  onDeleteCartItem,
  loadingWishlist,
  onQuantityChange,
}) => {
  const [qty, setQty] = useState(quantity || 1);

   const navigate = useNavigate();

const handleProductClick = () => {
  if (variantId) {
    navigate(`/product-details/${productId}?variantId=${variantId}`);
  } else {
    navigate(`/product-details/${productId}`);
  }
};

  const increment = () => {
    const newQty = qty + 1;
    setQty(newQty);
    onQuantityChange?.(newQty);
  };

  const decrement = () => {
    const newQty = qty > 1 ? qty - 1 : 1;
    setQty(newQty);
    onQuantityChange?.(newQty);
  };

  useEffect(() => {
    setQty(quantity || 1);
  }, [quantity]);

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`
    : "/placeholder.jpg";

  return (
    <div className="cart-page">
      <div className="d-flex flex-column border-bottom flex-md-row gap-4 px-4 pt-3 pb-3" >
        <img src={imageUrl} alt="Product" className="product-img" style={{cursor:"pointer"}} onClick={handleProductClick} />
        <div className="flex-grow-1">
          <h4 className="text-bold product-info" style={{cursor:"pointer"}} onClick={handleProductClick} >{product.title || "Untitled Product"}</h4>
          <p className="mb-1 product-info-p">{product.warranty || "No warranty info"}</p>
          <div className="d-flex align-items-center mb-3 gap-4 w-100">
            <div className="d-flex align-items-center">
              <label className="me-2 fw-semibold">Size</label>
              <select className="form-select w-100 me-2">
                {(product.sizes || ["M"]).map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center">
              <label className="me-2 fw-semibold">Qty</label>
              <div className="qty-box">
                <button className="btn-qty" onClick={decrement}>-</button>
                <input
                  type="text"
                  className="qty-input"
                  value={qty.toString().padStart(2, "0")}
                  readOnly
                />
                <button className="btn-qty" onClick={increment}>+</button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <h4 className="mb-0 price">{product.price || "Rs.0"}</h4>
            <span className="strike-text">{product.mrp || "MRP: Rs.0"}</span>
          </div>
          <div className="d-flex gap-2 mb-3">
            <small><i className="bi bi-arrow-counterclockwise me-2"></i> Easy 14 days return</small>
            <small><i className="bi bi-calendar me-2"></i> Delivery by {product.delivery || "N/A"}</small>
          </div>
          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onWishlistToggle(productId, variantId)}
              disabled={loadingWishlist}
            >
              {loadingWishlist ? (
                <Loader size={16} />
              ) : (
                <i className={`bi ${inWishlist ? "bi-heart-fill" : "bi-heart"} me-2`}></i>
              )}
              {inWishlist ? "Wishlisted" : "Wishlist"}
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={onDeleteCartItem}
            >
              <i className="bi bi-trash me-2"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriceSummary = ({ summary = {} }) => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { items, priceSummary, appliedCoupon } = useSelector((state) => state.cart);
  const itemsFromCart = useSelector((state) => state.cart.items);
  const { addresses = [] } = useSelector((state) => state.addressBook);
  const selectedAddress = addresses.find((addr) => addr.default) || addresses[0];
  const selectedAddressId = selectedAddress?.id || null;
  console.log('addresses', selectedAddressId)
  const {
    totalMRP = 0,
    discountOnMRP = 0,
    couponDiscount = 0,
    platformFee = 0,
    shippingFee = 0,
    finalPayable = 0,
  } = priceSummary;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setLoading(true);
    setError("");
    try {
      // const enrichedItems = items.map(item => ({
      //   productId: item.productId,
      //   variantId: item.variantId,
      //   quantity: item.quantity,
      // }));
      // console.log('enrichedItems', enrichedItems)
      await dispatch(applyCoupon(couponCode, items));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode("");
  };

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

    if (!itemsFromCart || itemsFromCart.length === 0) return null;
  return (
    <div className="p-3 border cart-page">
      <div className="mb-3">
        <h5 className="text-bold mt-1">Coupon</h5>
        <div className="coupon-section">
          <input
            type="text"
            className="form-control"
            placeholder="Enter coupon code"
            value={couponCode}
            disabled={!!appliedCoupon}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {!appliedCoupon ? (
            <button className="btn btn-apply p-0" onClick={handleApplyCoupon} disabled={loading}>
              {loading ? "Applying..." : "Apply"}
            </button>
          ) : (
            <button className="coupon-section__remove" onClick={handleRemoveCoupon}>
              <i className="bi bi-trash"></i>
            </button>
          )}

        </div>
        {error && <div className="text-danger small mt-1">{error}</div>}
        {appliedCoupon && (
          <div className="text-success small mt-1">
            Coupon "{appliedCoupon.code}" applied!
          </div>
        )}
      </div>
      <hr />
      <h5 className="text-bold">Price details</h5>
      <div className="d-flex justify-content-between">
        <span>Total MRP</span>
        <span>Rs.{totalMRP}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Discount on MRP</span>
        <span className="discount-text">Rs.{discountOnMRP}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Coupon Discount</span>
        <span className="discount-text">Rs.{couponDiscount}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Platform fee <small className="know-more">Know More</small></span>
        <span>Rs.{platformFee}</span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span>Shipping fee <small className="know-more">Know More</small></span>
        <span>Rs.{shippingFee}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between total-amount mb-3">
        <span>Total Amount</span>
        <span>Rs.{finalPayable}</span>
      </div>
      <PlaceOrderButton
       disabled={!itemsFromCart || itemsFromCart.length === 0}
        buildOrderData={() => {
          const items = itemsFromCart.map((item) => ({
            productId: item.productId,
            variantId: item.variantId || null,
            quantity: item.quantity,
            price: item.variant?.price || item.product?.price || 0,
            total: (item.variant?.price || item.product?.price || 0) * item.quantity,
          }));

          return {
            addressId: selectedAddressId,
            paymentMethod: 'COD',
            note: 'Leave at door',
            subtotal: totalMRP - discountOnMRP,
            shippingFee,
            gst: 0, // optional
            totalAmount: finalPayable,
            items,
          };
        }}
      />

    </div>
  );
};

const CartPage = () => {
  const dispatch = useDispatch();

  const { items: userCartItems = [] } = useSelector((state) => state.cart || {});
  const { items: guestCartItems = [] } = useSelector((state) => state.guestCart || {});
  console.log('guestCartItems', guestCartItems)
  const { items: wishlistItems } = useSelector((state) => state.whishlist);

  const loggedIn = isLoggedIn();

  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, loggedIn]);

  useEffect(() => {
    const updatedCart = (loggedIn ? userCartItems : guestCartItems).map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setLocalCart(updatedCart);
  }, [userCartItems, guestCartItems, loggedIn]);

  const handleQuantityChange = (id, newQty) => {
    setLocalCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
    const itemToUpdate = localCart.find(item => item.id === id);
    if (itemToUpdate) {
      const updatedItem = {
        quantity: newQty,
        productId: itemToUpdate.productId,
        variantId: itemToUpdate.variantId || null,
      };
      dispatch(UpdateToCart(id, updatedItem));
    }
  };

  const isInWishlist = (productId, variantId) => {
    return wishlistItems.some(
      (item) =>
        item.productId === productId &&
        (item.variantId === variantId || (!item.variantId && !variantId))
    );
  };

  const handleWishlistToggle = (productId, variantId) => {
    const item = wishlistItems.find(
      (item) =>
        item.productId === productId &&
        (item.variantId === variantId || (!item.variantId && !variantId))
    );

    if (item) {
      dispatch(deleteWishlistItem(item.id));
    } else {
      dispatch(addToWishlist(productId, variantId || null));
    }

    dispatch(fetchWishlist());
  };

  const calculateSummary = () => {
    let totalMRP = 0;
    let discountOnMRP = 0;
    const couponDiscount = 1000;
    const platformFee = 20;
    const shippingFee = 80;

    localCart.forEach((item) => {
      const source = item.variant || item.product || {};
      const qty = item.quantity || 1;
      totalMRP += (source.mrp || 0) * qty;
      discountOnMRP += ((source.mrp || 0) - (source.price || 0)) * qty;
    });

    const totalAfterDiscount = totalMRP - discountOnMRP - couponDiscount;
    const finalPayable = totalAfterDiscount + platformFee + shippingFee;

    return {
      totalMRP,
      discountOnMRP,
      couponDiscount,
      platformFee,
      shippingFee,
      totalAfterDiscount,
      finalPayable,
    };
  };

  const dynamicPriceSummary = calculateSummary();

  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 p-0 border-end">
            {localCart.length > 0 ? (
              localCart.map((item) => {
                const source = item.variant || item.product || {};
                const productId = item.productId;
                const variantId = item.variantId || null;

                return (
                  <CartItem
                    key={item.id || productId}
                    id={item.id}
                    productId={productId}
                    variantId={variantId}
                    quantity={item.quantity}
                    product={{
                      title: source.title,
                      warranty: source.brand,
                      price: `Rs.${source.price || 0}`,
                      mrp: `MRP: Rs.${source.mrp || 0}`,
                      sizes: [source.size || "M"],
                      image: source.imageUrl || "/placeholder.jpg",
                      delivery: "13 Aug",
                    }}
                    onWishlistToggle={handleWishlistToggle}
                    inWishlist={isInWishlist(productId, variantId)}
                    onDeleteCartItem={() => dispatch(DeleteFromCart(item.id))}
                    onQuantityChange={(newQty) => handleQuantityChange(item.id, newQty)}
                  />
                );
              })
            ) : (
              <div className="p-3">No items in cart.</div>
            )}
          </div>
          <div className="col-lg-4 p-0">
            <PriceSummary summary={dynamicPriceSummary} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
