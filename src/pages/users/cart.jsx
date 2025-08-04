import React, { useState, useEffect, memo, useCallback } from "react";
import "../../css/user/cart.css";
import "../../css/user/userstyle.css";
import "../../css/user/bootstrap-icons.css";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import P1 from "../../img/p1.png";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../../utils/auth";
import { DeleteFromCart, fetchCart } from "../../redux/actions/cartAction";
import BASE_URL from "../../config/config";
import { addToWishlist, deleteWishlistItem, fetchWishlist } from "../../redux/actions/whishlistAction";
import Loader from "../../includes/loader";
// Memoize CartItem to prevent unnecessary re-renders

const CartItem = memo(
  ({
    id,
    product,
    quantity = 1,
    variantId,
    productId,
    onWishlistToggle,
    inWishlist,
    onDeleteCartItem,
    loadingWishlist,
  }) => {
    const [qty, setQty] = useState(quantity || 1);

    // Memoize handlers to avoid recreation on each render
    const increment = useCallback(() => setQty((prev) => prev + 1), []);
    const decrement = useCallback(
      () => setQty((prev) => (prev > 1 ? prev - 1 : 1)),
      []
    );

    useEffect(() => {
      setQty(quantity || 1);
    }, [quantity]);

    // Memoize image URL computation
    const imageUrl = React.useMemo(() => {
      if (!product.image) return "/placeholder.jpg";
      return product.image.startsWith("http")
        ? product.image
        : `${BASE_URL}${product.image}`;
    }, [product.image]);

    return (
      <div className="cart-page">
        <div className="d-flex flex-column border-bottom flex-md-row gap-4 px-4 pt-3 pb-3">
          <img src={imageUrl} alt="Product" className="product-img" />
          <div className="flex-grow-1">
            <h4 className="text-bold product-info">{product.title}</h4>
            <p className="mb-1 product-info-p">{product.warranty}</p>
            <div className="d-flex align-items-center mb-3 gap-4 w-100">
              <div className="d-flex align-items-center">
                <label className="me-2 fw-semibold">Size</label>
                <select className="form-select w-100 me-2" defaultValue={product.sizes[0]}>
                  {product.sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="d-flex align-items-center">
                <label className="me-2 fw-semibold">Qty</label>
                <div className="qty-box">
                  <button className="btn-qty" onClick={decrement} aria-label="Decrease quantity">-</button>
                  <input
                    type="text"
                    className="qty-input"
                    value={qty.toString().padStart(2, "0")}
                    readOnly
                  />
                  <button className="btn-qty" onClick={increment} aria-label="Increase quantity">+</button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <h4 className="mb-0 price">{product.price}</h4>
              <span className="strike-text">{product.mrp}</span>
            </div>
            <div className="d-flex gap-2 mb-3">
              <small>
                <i className="bi bi-arrow-counterclockwise me-2"></i> Easy 14 days return
              </small>
              <small>
                <i className="bi bi-calendar me-2"></i> Delivery by {product.delivery}
              </small>
            </div>
            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onWishlistToggle(productId, variantId)}
                aria-pressed={inWishlist}
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
                aria-label="Delete from cart"
              >
                <i className="bi bi-trash me-2"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);


const PriceSummary = () => (
  <div className="p-3 border cart-page">
    <div className="mb-3">
      <h5 className="text-bold mt-1">Coupon</h5>
      <div className="coupon-section">
        <input type="text" className="form-control" placeholder="" />
        <button className="btn btn-apply p-0">Apply</button>
        <button className="coupon-section__remove">
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
    <hr />
    <h5 className="text-bold">Price details</h5>
    <div className="d-flex justify-content-between">
      <span>Total MRP</span>
      <span>Rs.5600</span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Discount on MRP</span>
      <span className="discount-text">Rs.2000</span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Coupon Discount</span>
      <span className="discount-text">Rs.1000</span>
    </div>
    <div className="d-flex justify-content-between">
      <span>Platform fee <small className="know-more">Know More</small></span>
      <span>Rs.20</span>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Shipping fee <small className="know-more">Know More</small></span>
      <span>Rs.80</span>
    </div>
    <hr />
    <div className="d-flex justify-content-between total-amount mb-3">
      <span>Total Amount</span>
      <span>Rs.2700</span>
    </div>
    <a href="/checkout" className="btn btn-place-order w-100">Place Order</a>
  </div>
);

const CartPage = () => {
  const dispatch = useDispatch();

  const { items: userCartItems } = useSelector((state) => state.cart); // backend cart
  const { items: guestCartItems } = useSelector((state) => state.guestCart); // guest cart
  const { items: wishlistItems } = useSelector((state) => state.whishlist);

  const loggedIn = isLoggedIn();
  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchCart());
    }
  }, [dispatch, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, loggedIn]);

  const cartItems = loggedIn ? userCartItems : guestCartItems;

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
       dispatch(fetchWishlist());
    } else {
      dispatch(addToWishlist(productId, variantId || null));
       dispatch(fetchWishlist());
    }

    dispatch(fetchWishlist());
  };


  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 p-0 border-end">
            {cartItems.length > 0 ? (cartItems.map((item) => {
              const source = item.variant || item.product || {};
              const image =
                source.imageUrl
                  ? source.imageUrl.startsWith('http')
                    ? source.imageUrl
                    : `${BASE_URL}${source.imageUrl}`
                  : "/placeholder.jpg";
              const productId = item.productId;
              const variantId = item.variantId || null;
              return (
                <CartItem
                  key={item.id || item.productId}
                  productId={productId}
                  variantId={variantId}
                  quantity={item.quantity}
                  product={{
                    title: source.title || "Untitled Product",
                    warranty: source.brand || "No brand info",
                    price: `Rs.${source.price || 0}`,
                    mrp: `MRP: Rs.${source.mrp || 0}`,
                    sizes: [source.size || "M"],
                    image,
                    delivery: "13 Aug",
                  }}
                  onWishlistToggle={handleWishlistToggle}
                  inWishlist={isInWishlist(item.productId, item.variantId)}
                  onDeleteCartItem={() => dispatch(DeleteFromCart(item.id))}
                />
              );
            }
            ))
              : (
                <div className="p-3">No items in cart.</div>
              )}

          </div>

          <div className="col-lg-4 p-0">
            <PriceSummary />
          </div>
        </div>

        {/* Delivery Info */}
        {loggedIn && (
          <div className="mt-4">
            <div className="deliver-to d-flex justify-content-between align-items-center p-4">
              <div>
                <h5 className="text-bold">Deliver to:</h5>
                <p><strong>Chaitanya nelluri</strong></p>
                <p>Flat no G3 Balaji homes, Nizampet, Hyderabad - 500090</p>
                <p>Mobile: 8790969134</p>
              </div>
              <button className="btn btn-change-address">Change Address</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
