import React from "react";
import { Link } from "react-router-dom";
import '../css/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../src/css/bootstrap-icons.css';
import '../../src/css/bootstrap.min.css';

const ProductCard = ({ product }) => {
  return (
    <div className="col-lg-4 col-6 p-2">
      <Link to="/product-details" className="text_decoration" >
        <div className="card h-100 position-relative">
          <div className="discount-badge">{product.discount}</div>
          <div className="wishlist-icon">
            <img src={product.icon} alt="Wishlist" />
          </div>
          <img src={product.image} className="card-img-top" alt="Sofa" />
          <div className="card-body">
            <h6 className="card-title" >{product.title}</h6>
            <p className="card-text">
              <strong>{product.price}</strong> <del>MRP {product.mrp}</del>
            </p>
            <div className="rating d-flex align-items-center mb-2">
              {product.rating.map((star, i) => (
                <img key={i} src={star} className="me-2" alt="Rating" />
              ))}
              <span>{product.reviews}</span>
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
