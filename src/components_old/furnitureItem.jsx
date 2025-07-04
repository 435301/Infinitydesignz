import React from "react";

const FurnitureItem = ({ product, isBordered }) => {
  return (
    <div className="col">
      <div className={`furniture-box ${isBordered ? 'border-end1' : ''}`}>
        <i className="bi bi-heart icon-heart"></i>
        <img
          src={product.image}
          alt={product.alt}
          className="furniture-img"
        />
        <div className="furniture-name">{product.name}</div>
        <div className="furniture-desc">{product.description}</div>
        <div>
          <span className="furniture-price-new">{product.priceNew}</span>
          <span className="furniture-price-old">{product.priceOld}</span>
        </div>
        <div className="furniture-offer">{product.discount}</div>
      </div>
    </div>
  );
};

export default FurnitureItem;
