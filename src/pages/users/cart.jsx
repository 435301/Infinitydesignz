import React, { useState } from "react";
import "../../css/user/cart.css";
import "../../css/user/userstyle.css";
import "../../css/user/bootstrap-icons.css";
import Header from "../../includes/header"; // ✅ Only one Header import
import Footer from "../../includes/footer";
import P1 from "../../img/p1.png";

const CartItem = ({ id, product }) => {
  const [qty, setQty] = useState(1);

  const increment = () => setQty((prev) => prev + 1);
  const decrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="cart-page">
      <div className="d-flex flex-column border-bottom flex-md-row gap-4 px-4 pt-3 pb-3">
        <img src={product.image} alt="Product" className="product-img" />
        <div className="flex-grow-1">
          <h4 className="text-bold product-info">{product.title}</h4>
          <p className="mb-1 product-info-p">{product.warranty}</p>
          <div className="d-flex align-items-center mb-3 gap-4 w-100">
            <div className="d-flex align-items-center">
              <label className="me-2 fw-semibold">Size</label>
              <select className="form-select w-100 me-2">
                {product.sizes.map((size) => (
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
                  value={qty.toString().padStart(2, '0')}
                  readOnly
                />
                <button className="btn-qty" onClick={increment}>+</button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <h4 className="mb-0 price">{product.price}</h4>
            <span className="strike-text">{product.mrp}</span>
          </div>
          <div className="d-flex gap-2 mb-3">
            <small><i className="bi bi-arrow-counterclockwise me-2"></i> Easy 14 days return</small>
            <small><i className="bi bi-calendar me-2"></i> Delivery by {product.delivery}</small>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-heart me-2"></i> Wishlist
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-trash me-2"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const cartProducts = [
    {
      id: 1,
      title: "Andres Fabric 2 Seater Sofa In Sandy Brown Colour",
      warranty: "36-Month Warranty Available",
      price: "Rs.2405",
      mrp: "MRP: Rs.3367",
      sizes: ["L", "M", "S"],
      image: P1,
      delivery: "13 Aug",
    },
  ];

  return (
    <>
      <Header /> {/* ✅ Correctly added once */}
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 p-0 border-end">
            {cartProducts.map((product) => (
              <CartItem key={product.id} id={product.id} product={product} />
            ))}
          </div>
          <div className="col-lg-4 p-0">
            <PriceSummary />
          </div>
        </div>

        {/* Delivery Info */}
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
      </div>
      <Footer /> {/* ✅ Footer correctly added */}
    </>
  );
};

export default CartPage;
