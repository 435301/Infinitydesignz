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
  addToGuestCart,
  syncGuestCartToUserCart,
} from "../../redux/actions/cartAction";
import BASE_URL from "../../config/config";
import {
  addToWishlist,
  deleteWishlistItem,
  fetchWishlist,
} from "../../redux/actions/whishlistAction";
import Loader from "../../includes/loader";
import { fetchAddresses } from "../../redux/actions/addressAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteFromGuestCart, initializeGuestCart, updateGuestCart } from "../../redux/actions/guestCartAction";
import { applyCouponBuyNow, clearBuyNow, getBuyNow, updateBuyNow } from "../../redux/actions/buyNowAction";

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
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (variantId) {
      navigate(`/product-details/${productId}?variantId=${variantId}`);
    } else {
      navigate(`/product-details/${productId}`);
    }
  };

  const increment = () => {
    const newQty = quantity + 1;
    onQuantityChange?.(newQty);
  };

const decrement = () => {
  if (quantity <= 1) {
    toast.warning("Quantity cannot be less than 1");
    return;
  }
  const newQty = quantity - 1;
  onQuantityChange?.(newQty);
};

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`
    : "/placeholder.jpg";


  return (
    <div className="cart-page">
      <div className="d-flex flex-column border-bottom flex-md-row gap-4  pt-3 pb-2 px-3">
        <img
          src={imageUrl}
          alt="Product"
          className="product-img"
          style={{ cursor: "pointer" }}
          onClick={handleProductClick}
        />
        <div className="flex-grow-1">
          <h4
            className="text-bold product-info"
            style={{ cursor: "pointer" }}
            onClick={handleProductClick}
          >
            {product.title || "Untitled Product"}
          </h4>
          {/* <p className="mb-1 product-info-p">{product.warranty || "No warranty info"}</p> */}
          <div className="d-flex align-items-center mb-2 pt-1">
            {/* <div className="d-flex align-items-center"> */}
            <label className="me-2 fw-semibold text-dark size-wishlist">Size</label>
            {(product.sizes || [product?.variant?.size || "N/A"]).map((size) => (
              <input
                key={size}
                type="text"
                className="form-control w-30 me-4 cart-size-width"
                value={size}
                readOnly
              // disabled
              />
            ))}
            {/* </div> */}
            {/* <div className="d-flex align-items-center"> */}
            <label className="me-2 fw-semibold text-dark size-wishlist">Qty</label>
            <div className="qty-box d-flex align-items-center">
              <button className="btn-qty" onClick={decrement}>-</button>
              <input
                type="text"
                className="qty-input text-center"
                value={quantity.toString().padStart(2, "0")}
                readOnly
              />
              <button className="btn-qty" onClick={increment}>+</button>
            </div>
            {/* </div> */}
          </div>
          <div className="d-flex align-items-center gap-3 mb-3 pt-2">
            <h4 className="mb-0 price">
              ₹ {product.price ? Number(String(product.price).replace(/[^0-9.]/g, "")) : "0"}
            </h4>
            <span className="strike-text">MRP:₹{product.mrp || "MRP: ₹.0"}</span>
          </div>
          <div className="d-flex gap-2 mb-3">
            <small>
              <i className="bi bi-arrow-counterclockwise me-2"></i> Easy 14 days return
            </small>
            <small>
              <i className="bi bi-calendar me-2"></i> Delivery by {product.delivery || "N/A"}
            </small>
          </div>
          <div className="d-flex gap-3 mb-2">
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

const PriceSummary = ({ summary = {}, isBuyNowMode = false, buyNowItems = [] }) => {
  console.log('summary', summary)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { appliedCoupon } = useSelector((state) => state.cart || {});
  const { coupon: buyNowCoupon } = useSelector((state) => state.buyNow || {});
  const { addresses = [] } = useSelector((state) => state.addressBook || {});
  const selectedAddress = addresses.find((addr) => addr.default) || addresses[0];
  const selectedAddressId = selectedAddress?.id || null;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setLoading(true);
    setError("");
    try {
      if (isBuyNowMode) {
        await dispatch(
          applyCouponBuyNow({
            code: couponCode,
            productId: buyNowItems[0]?.productId,
            variantId: buyNowItems[0]?.variantId || null,
            quantity: buyNowItems[0]?.quantity || 1,
          })
        );
      } else {
        // Dispatch applyCoupon for regular cart mode
        await dispatch(applyCoupon(couponCode));
      }
    } catch (err) {
      setError(err.message || "Failed to apply coupon");
    } finally {
      setLoading(false);
      setError("");
    }
  };

  const handleRemoveCoupon = () => {
    if (isBuyNowMode) {
      // Dispatch action to remove coupon for Buy Now mode (if applicable)
      dispatch({ type: "REMOVE_BUYNOW_COUPON" }); // Adjust based on your buyNowAction
    } else {
      dispatch(removeCoupon());
    }
    setCouponCode("");
  };

  const handleClick = () => {
    if (isLoggedIn()) {
      navigate("/checkout");
    } else {
      dispatch({ type: "SHOW_LOGIN_MODAL" });
    }
  };

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // Use the appropriate coupon based on mode
  const coupon = isBuyNowMode ? buyNowCoupon : appliedCoupon;

  return (
    <div className="p-3 border cart-page">
      <div className="mb-3">
        <h5 className="text-bold mt-1">Coupon</h5>
        <div className="coupon-section">
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={couponCode}
            disabled={!!coupon}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          {!coupon ? (
            <button
              className="btn btn-apply p-0"
              onClick={handleApplyCoupon}
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          ) : (
            <button className="coupon-section__remove" onClick={handleRemoveCoupon}>
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
        {error && <div className="text-danger small mt-1">{error}</div>}
        {coupon && (
          <div className="text-success small mt-1">
            Coupon "{coupon.code}" applied!
          </div>
        )}
      </div>
      <hr />
      <h5 className="text-bold">Price details</h5>
      <div className="d-flex justify-content-between">
        <span className="price-detail-label">Total MRP</span>
        <span className="price-detail-label">₹{summary.totalMRP || 0}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span className="price-detail-label">Sub Total</span>
        <span className="price-detail-label">₹{summary.totalAfterDiscount || 0}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span className="price-detail-label">Discount on MRP</span>
        <span className="discount-text price-detail-label">-₹{summary.discountOnMRP || 0}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span className="price-detail-label">Coupon Discount</span>
        <span className="discount-text price-detail-label">₹{summary.couponDiscount || 0}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span className="price-detail-label">Platform Fee <small className="know-more">Know More</small></span>
        <span className="price-detail-label">₹{summary.platformFee || 0}</span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span className="price-detail-label">Shipping Fee <small className="know-more">Know More</small></span>
        <span className="price-detail-label">₹{summary.shippingFee || 0}</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between total-amount mb-3">
        <span>Total Amount</span>
        <span>₹{summary.finalPayable || 0}</span>
      </div>
      <button className="btn btn-place-order w-100" onClick={handleClick}>
        Checkout
      </button>
    </div>
  );
};

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: userCartItems = [], priceSummary = {} } = useSelector((state) => state.cart || {});
  const { items: guestCartItems = [] } = useSelector((state) => state.guestCart || {});
  const { items: wishlistItems = [] } = useSelector((state) => state.whishlist || {});
  const { buyNow = null } = useSelector((state) => state.buyNow || {});
  const loggedIn = isLoggedIn();
  const [localCart, setLocalCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const isBuyNowMode = params.get("buyNow") === "true";

  // Initialize guest cart from localStorage
  useEffect(() => {
    dispatch(initializeGuestCart());
  }, [dispatch]);

  // Fetch user cart and wishlist if logged in
  useEffect(() => {
    if (isBuyNowMode) {
      dispatch(getBuyNow());
    } else if (loggedIn) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
      dispatch(syncGuestCartToUserCart());
    } else {
      dispatch(initializeGuestCart());
    }
  }, [dispatch, loggedIn, isBuyNowMode]);

  // Fetch product details for guest cart items
  useEffect(() => {
    const loadCartData = async () => {
      // 1️⃣ Buy Now Mode
      // 1️⃣ Buy Now mode should never fall through to normal cart
      if (isBuyNowMode) {
        if (buyNow?.items?.length > 0) {
          setLocalCart(
            buyNow.items.map((item) => {
              const source = item.variant || item.product || {};
              return {
                id: item.id,
                productId: item.productId,
                variantId: item.variantId || null,
                quantity: item.quantity || 1,
                product: {
                  title: source.title || "Untitled Product",
                  warranty: source.brand || "N/A",
                  price: `₹${source.price || 0}`,
                  mrp: ` ${source.mrp || 0}`,
                  sizes: [source.size || "M"],
                  image: source.imageUrl || "/placeholder.jpg",
                  delivery: "13 Aug",
                },
              };
            })
          );
        } else {
          // Buy-Now cleared or empty → show empty list (don’t load normal cart)
          setLocalCart([]);
        }
        return;
      }

      // 2️⃣ Logged-in normal cart
      if (loggedIn) {
        setLocalCart(
          userCartItems.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
            product: {
              title: (item.variant || item.product)?.title,
              warranty: (item.variant || item.product)?.brand,
              price: `₹${(item.variant || item.product)?.price || 0}`,
              mrp: `MRP: ₹${(item.variant || item.product)?.mrp || 0}`,
              sizes: [(item.variant || item.product)?.size || "M"],
              image: (item.variant || item.product)?.imageUrl || "/placeholder.jpg",
              delivery: "13 Aug",
            },
          }))
        );
        return;
      }

      // 3️⃣ Guest cart
      if (!loggedIn && guestCartItems.length > 0) {
        try {
          setLoading(true);
          const itemsWithDetails = await Promise.all(
            guestCartItems.map(async (item) => {
              try {
                const response = await axios.get(
                  `${BASE_URL}/products/${item.productId}${item.variantId ? `?variantId=${item.variantId}` : ""}`
                );
                const productData = response.data;

                let source = productData;
                if (item.variantId && productData.variants?.length) {
                  source = productData.variants.find((v) => v.id === item.variantId) || productData;
                }

                const sizeLabel = source.size?.title || productData.size?.title || "M";

                const variantImage =
                  productData.images?.variants?.[item.variantId?.toString()]?.main?.url;

                const fallbackImage = productData.images?.main?.url;

                const imageUrl = variantImage || fallbackImage || "/placeholder.jpg";

                return {
                  ...item,
                  product: {
                    title: productData.title,
                    warranty: productData.brand?.name || "N/A",
                    price: `₹.${source.sellingPrice || source.price || 0}`,
                    mrp: `MRP: ₹.${source.mrp || 0}`,
                    sizes: [sizeLabel],
                    image: imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}/Uploads/products/${imageUrl}`,
                    delivery: "13 Aug",
                  },
                };
              } catch (error) {
                console.error(`Failed to fetch product ${item.productId}:`, error);
                return {
                  ...item,
                  product: {
                    title: "Unknown Product",
                    warranty: "N/A",
                    price: "₹0",
                    mrp: "MRP: ₹0",
                    sizes: ["M"],
                    image: "/placeholder.jpg",
                    delivery: "N/A",
                  },
                };
              }
            })
          );

          setLocalCart(itemsWithDetails);
        } catch (error) {
          console.error("Failed to fetch guest cart details:", error);
          toast.error("Failed to load guest cart details");
        } finally {
          setLoading(false);
        }
      } else {
        setLocalCart([]);
      }
    };

    loadCartData();
  }, [isBuyNowMode, buyNow, loggedIn, userCartItems, guestCartItems]);


  const handleCheckout = () => {
    dispatch({ type: "ALLOW_CHECKOUT" });
    navigate("/checkout");
  };
  const handleQuantityChange = (id, newQty, productId, variantId) => {
    if (isBuyNowMode) {
      const updateData = {
        quantity: newQty,
        productId,
        variantId: variantId || null,
      };
      dispatch(updateBuyNow(updateData));
    }
    else if (loggedIn) {
      const itemToUpdate = localCart.find((item) => item.id === id);
      if (itemToUpdate) {
        const updatedItem = {
          quantity: newQty,
          productId: itemToUpdate.productId,
          variantId: itemToUpdate.variantId || null,
        };
        dispatch(UpdateToCart(id, updatedItem));
      }
    } else {
      dispatch(
        updateGuestCart(id, {
          productId,
          variantId: variantId || null,
          quantity: newQty,
        })
      );
    }
  };


  const handleDeleteCartItem = async (id, productId, variantId) => {
    if (isBuyNowMode) {
      try {
        setLoading(true);

        dispatch(clearBuyNow());
        setLocalCart([]);
      } catch (error) {
        toast.error(error.message || "Failed to remove Buy Now item");
      } finally {
        setLoading(false);
      }
    } else if (loggedIn) {
      dispatch(DeleteFromCart(id));
    } else {
      dispatch(deleteFromGuestCart(productId, variantId));
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
    if (!loggedIn) {
      toast.error("Please log in to manage your wishlist");
      return;
    }
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
  };

  const calculateSummary = () => {
    let totalMRP = 0;
    let discountOnMRP = 0;
    const couponDiscount = priceSummary.couponDiscount || 0;
    const platformFee = priceSummary.platformFee || 20;
    const shippingFee = priceSummary.shippingFee || 80;

    localCart.forEach((item) => {
      const source = item.variant || item.product || {};
      const qty = item.quantity || 1;
      const price = parseFloat(source.price?.replace("₹", "") || 0);
      const mrp = parseFloat(source.mrp?.replace("MRP: ₹", "") || 0);
      totalMRP += mrp * qty;
      discountOnMRP += (mrp - price) * qty;
    });

    const totalAfterDiscount = totalMRP - discountOnMRP - couponDiscount;
    const finalPayable = totalAfterDiscount + platformFee + shippingFee;

    return {
      totalMRP,
      discountOnMRP,
      couponDiscount,
      platformFee,
      shippingFee,
      finalPayable,
    };
  };

  const dynamicPriceSummary = isBuyNowMode ? buyNow?.priceSummary || {} : loggedIn ? priceSummary : calculateSummary();
  const buyNowSummary = useSelector((state) => state.buyNow?.priceSummary);

  return (
    <>
      <Header />
      <section className="py-3" style={{ backgroundColor: "#f4f4f4" }}>
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <a href=""><strong>My Cart</strong></a>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-4">
        {loading && <Loader />}
        <div className="row">
          <div className="col-lg-8 p-0 border-end">
            {localCart.length > 0 ? (
              localCart.map((item) => {
                const source = item.variant || item.product || {};
                const productId = item.productId;
                const variantId = item.variantId || null;

                return (
                  <CartItem
                    key={item.id || `${productId}-${variantId}`}
                    id={item.id || `${productId}-${variantId}`}
                    productId={productId}
                    variantId={variantId}
                    quantity={item.quantity}
                    product={{
                      title: source.title,
                      warranty: source.warranty || source.brand,
                      price: source.price || "₹0",
                      mrp: source.mrp || "MRP: ₹0",
                      sizes: source.sizes || [source.size || "M"],
                      image: source.image || source.imageUrl || "/placeholder.jpg",
                      delivery: source.delivery || "13 Aug",
                    }}
                    onWishlistToggle={handleWishlistToggle}
                    inWishlist={isInWishlist(productId, variantId)}
                    onDeleteCartItem={() => handleDeleteCartItem(item.id, productId, variantId)}
                    onQuantityChange={(newQty) =>
                      handleQuantityChange(item.id || `${productId}-${variantId}`, newQty, productId, variantId)
                    }
                  />
                );
              })
            ) : (
              <div className="p-3">No items in cart.</div>
            )}
          </div>


          <div className="col-lg-4 p-0">
            {localCart.length > 0 && <PriceSummary
              summary={
                isBuyNowMode
                  ? (buyNowSummary && Object.keys(buyNowSummary).length > 0
                    ? buyNowSummary
                    : buyNow?.priceSummary || {})
                  : dynamicPriceSummary
              }
              isBuyNowMode={isBuyNowMode}
              buyNowItems={isBuyNowMode ? buyNow?.items || [] : []}
            />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;