import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../config/config";
import { FaRegHeart } from "react-icons/fa"; 
import '../../src/css/user/userstyle.css';

const ProductCard = ({ product }) => {
  const {
    id,
    title = "No Title",
    mrp = 0,
    sellingPrice = 0,
    images = [],
    variants = []
  } = product || {};
  const mainImageObj = images.find(img => img.isMain) || images[0];
  const hasImage = !!mainImageObj?.url;
  const imageUrl = hasImage ? `${BASE_URL}/uploads/products/${mainImageObj.url}` : "";
  let displayMrp = mrp;
  let displayPrice = sellingPrice;

  if ((!displayMrp || !displayPrice) && variants.length > 0) {
    displayMrp = variants[0].mrp || 0;
    displayPrice = variants[0].sellingPrice || 0;
  }
  let discountPercent = 0;
  if (displayMrp > displayPrice && displayMrp !== 0) {
    discountPercent = Math.round(((displayMrp - displayPrice) / displayMrp) * 100);
  }
  return (
    <div className="col-lg-4 col-6 p-2">
      <Link to={`/product-details/${id}`} className="text_decoration">
        <div className="card h-100 position-relative">
          <div className="discount-badge position-absolute top-0 start-0 bg-danger text-white px-2 pt-1 mt-3 rounded">
            {discountPercent}% OFF
          </div>
           <div
            className="position-absolute top-0 end-0 p-2"
            style={{ zIndex: 2 }}
          >
            <div
              className="whishlist_Icon"
            >
              <FaRegHeart
                className="text-black"
                style={{ fontSize: "1.1rem", cursor: "pointer" }}
                title="Add to Wishlist"
              />
            </div>
          </div>
          {hasImage ? (
            <img src={imageUrl} className="card-img-top" alt={title} />
          ) : (
            <div
              className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
              style={{ height: "200px", fontSize: "1.2rem" }}
            >
              N/A
            </div>
          )}
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p className="card-text">
              <strong>₹{displayPrice}</strong>{" "}
              {displayMrp > displayPrice ? (
                <del>MRP ₹{displayMrp}</del>
              ) : (
                <span className="text-muted ms-2">(No discount)</span>
              )}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
