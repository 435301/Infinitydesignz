import React from "react";
import { Link } from "react-router-dom";
import '../css/user/userstyle.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/user/bootstrap-icons.css'; // Use relative path inside src
import '../css/user/bootstrap.min.css';   // Same here

const ProductCard = ({ product }) => {
  // Optional: default values if props are missing
  const {
    discount = '',
    icon = '',
    image = '',
    title = 'No Title',
    price = '₹0',
    mrp = '₹0',
    rating = [],
    reviews = '0 reviews'
  } = product || {};

  return (
    <div className="col-lg-3 col-6 p-2">
      <Link to="/product-details" className="text_decoration">
        <div className="card h-100 position-relative">
          {discount && <div className="discount-badge">{discount}</div>}
          {icon && (
            <div className="wishlist-icon">
              <img src={icon} alt="Wishlist" />
            </div>
          )}
          <img src={image} className="card-img-top" alt="Product" />
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p className="card-text">
              <strong>{price}</strong> <del>MRP {mrp}</del>
            </p>
            <div className="rating d-flex align-items-center mb-2">
              {Array.isArray(rating) &&
                rating.map((star, i) => (
                  <img key={i} src={star} className="me-2" alt="Rating" />
                ))}
              <span>{reviews}</span>
            </div>
            <p className="emi-text">
              36-Month Warranty Available<br />
              EMI starting from ₹1,825/month<br />
              Express Shipping in 1 day
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
