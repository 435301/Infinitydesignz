import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../config/config";

const ProductCard = ({ product }) => {
  const {
    title = "No Title",
    sellingPrice = 0,
    mrp = 0
  } = product || {};


  const images = [];

  // Main product image
  if (product?.images?.main?.url) {
    images.push(`${BASE_URL}/uploads/products/${product.images.main.url}`);
  }

  // Additional product images
  if (product?.images?.additional?.length) {
    product.images.additional.forEach(img => {
      if (img?.url) {
        images.push(`${BASE_URL}/uploads/products/${img.url}`);
      }
    });
  }

  // Variant images (main and additional)
  if (product?.images?.variants) {
    Object.values(product.images.variants).forEach(variantImg => {
      if (variantImg.main?.url) {
        images.push(`${BASE_URL}/uploads/products/${variantImg.main.url}`);
      }

      if (Array.isArray(variantImg.additional)) {
        variantImg.additional.forEach(addImg => {
          if (addImg?.url) {
            images.push(`${BASE_URL}/uploads/products/${addImg.url}`);
          }
        });
      }
    });
  }

  const fallback = "/placeholder.png";
  const firstImage = images[0] || fallback;

  let discountPercent = null;
  if (mrp > sellingPrice && mrp !== 0) {
    discountPercent = Math.round(((mrp - sellingPrice) / mrp) * 100);
  }


  return (
    <div className="col-lg-3 col-6 p-2">
      <Link to="/product-details" className="text_decoration">
        <div className="card h-100 position-relative">
           {discountPercent && (
              <div className="discount-badge position-absolute top-0 start-0 bg-danger text-white px-2 py-1 rounded">
                {discountPercent}% OFF
              </div>
            )}
          <img src={firstImage} className="card-img-top" alt={product.title || "Product"} />

          <div className="card-body">
            <h6 className="card-title">{product.title}</h6>
            <p className="card-text">
              <strong>₹{product.sellingPrice}</strong>{" "}
              <del>MRP ₹{product.mrp}</del>
            </p>
           
            <div className="d-flex flex-wrap mt-2">
              {images.slice(0, 4).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`thumb-${i}`}
                  style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "5px", borderRadius: "4px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
