import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../config/config";
import { FaRegHeart } from "react-icons/fa";
import '../../src/css/user/userstyle.css';

const ProductCard = ({ product, variant = null }) => {
  const {
    id,
    title = "No Title",
    images = [],
    mrp,
    sellingPrice,
    variants = [],
  } = product || {};

  let displayMrp = mrp;
  let displayPrice = sellingPrice;
  let mainImageObj = null;

  if (variant) {
    const variantId = variant.id;
    displayMrp = variant.mrp;
    displayPrice = variant.sellingPrice;

    mainImageObj =
      images.find((img) => img.variantId === variantId && img.isMain) ||
      images.find((img) => img.variantId === variantId);
  } else {
    mainImageObj =
      images.find((img) => img.variantId === null && img.isMain) ||
      images.find((img) => img.variantId === null);

    if ((!displayMrp || !displayPrice) && variants.length > 0) {
      displayMrp = variants[0].mrp || 0;
      displayPrice = variants[0].sellingPrice || 0;
    }
  }

  const hasImage = !!mainImageObj?.url;
  const imageUrl = hasImage
    ? `${BASE_URL}/uploads/products/${mainImageObj.url}`
    : "";

  let discountPercent = 0;
  if (displayMrp > displayPrice && displayMrp !== 0) {
    discountPercent = Math.round(
      ((displayMrp - displayPrice) / displayMrp) * 100
    );
  }

  return (
    <div className="col-lg-4 col-6 p-2">
      <Link to={`/product-details/${id}`} className="text_decoration">
        <div className="card h-100 position-relative">
          {discountPercent > 0 && (
          <div className="discount-badge position-absolute ">
              {discountPercent}% OFF
            </div>
          )}
          <div
            className="position-absolute top-0 end-0 p-2"
            style={{ zIndex: 2 }}
          >
            <div className="whishlist_Icon">
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
