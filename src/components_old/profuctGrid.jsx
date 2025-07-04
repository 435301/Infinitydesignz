import React from 'react';
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';

const ProductGrid = ({ products, productsName }) => {
  return (
    <div className="container Fabric pb-4">
      <div className="row row-cols-1 row-cols-md-4 g-4 text-start">
        {products.map((product, i) => (
          <div className="col-lg-3 p-2" key={`card-${i}`}>
            <a href={product.link || '#'} className="text-decoration-none">
              <div className="card h-100 position-relative">
                {product.discount && (
                  <div className="discount-badge">{product.discount}</div>
                )}
                <div className="wishlist-icon">
                  <img src={product.wishlistIcon} alt="Wishlist" />
                </div>
                <img src={product.image} className="card-img-top" alt={product.alt || "Product"} />
                <div className="card-body">
                  <h6 className="card-title">{product.title}</h6>
                  <p className="card-text">
                    <strong>{product.price}</strong>{' '}
                    <del>{product.originalPrice}</del>
                  </p>
                  <div className="rating d-flex align-items-center mb-2">
                    {[...Array(4)].map((_, index) => (
                      <img key={index} src={product.starIcon} className="me-2" alt="star" />
                    ))}
                    <img src={product.halfStarIcon} className="me-2" alt="half-star" />
                    <span>{product.rating}</span>
                  </div>
                  <p className="emi-text">
                    {product.emiInfo.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
