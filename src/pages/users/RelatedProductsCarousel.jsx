import React from 'react';
import Star from '../../img/star.svg';
import Star1 from '../../img/star1.svg';
import WishlistIcon from '../../img/icon.svg';
import SampleImage from '../../img/img3.png';

const RelatedProductsCarousel = ({ products }) => {
  return (
    <div id="relatedProductsCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-controls">
        <button className="carousel-control-prev" type="button" data-bs-target="#relatedProductsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#relatedProductsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>                                             
        </button>
      </div>

      <div className="carousel-inner">
        {products.map((product, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="card h-100 position-relative">
              <div className="discount-badge">{product.discount}</div>
              <div className="wishlist-icon"><img src={WishlistIcon} alt="wishlist" /></div>
              <img src={product.image || SampleImage} className="card-img-top" alt="Product" />
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">
                  <strong>{product.price}</strong> <del>{product.originalPrice}</del>
                </p>
                <div className="rating d-flex align-items-center mb-2">
                  {[...Array(4)].map((_, i) => <img key={i} src={Star} className="me-2" alt="*" />)}
                  <img src={Star1} className="me-2" alt="*" /><span>{product.rating} | {product.reviews}</span>
                </div>
                <p className="emi-text">
                  {product.warranty}<br />
                  {product.emi}<br />
                  {product.shipping}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;
