import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/css/wishlist.css";
import "../../src/css/style.css";
import '../../src/css/bootstrap-icons.css';
import AdBanner from '../../src/img/ad-banner.png';
import Img3 from '../../src/img/img3.png';
import Star from '../../src/img/star.svg';
import Star1 from '../../src/img/star1.svg';
import Sofa from '../../src/p1.png';


export default function WishlistPage() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const wishlistItems = [1, 2, 3]; // Dummy items for loop

  const relatedProducts = [
    {
      id: 1,
      title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
      price: "₹37,999",
      originalPrice: "₹48,999",
      img: {Img3},
      rating: "4.4 | 24K"
    },
    {
      id: 2,
      title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
      price: "₹37,999",
      originalPrice: "₹48,999",
      img: {Img3},
      rating: "4.4 | 24K"
    }
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <a href="">
                <strong>My Account</strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Section */}
      <section className="py-5">
        <div className="container shop">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-2 sidebar">
              <a href="profile.php">Profile</a>
              <a href="orders.php">Orders</a>
              <a href="wishlist.php" className="active">
                Wishlist
              </a>
              <a href="addressbook.php">Address book</a>
            </div>

            {/* Main Content */}
            <div className="col-md-7">
              <div className="wishlist-header">
                <h2 className="m-0">Wishlist</h2>
              </div>

              {wishlistItems.map((item, index) => (
                <div key={index} className="wishlist-item border-between">
                  <div className="col-3">
                    <img src={Sofa} alt="Sofa" className="wishlist-item-img" />
                  </div>
                  <div className="details">
                    <h5>Andres Fabric 2 Seater Sofa In Sandy Brown Colour</h5>
                    <p>36-Month Warranty Available</p>
                    <div className="d-flex align-items-center mb-3">
                      <label className="me-2 fw-semibold">Size</label>
                      <select className="form-select w-30 me-4">
                        <option>L</option>
                        <option>M</option>
                        <option>S</option>
                      </select>

                      <label className="me-2 fw-semibold">Qty</label>
                      <div className="qty-box">
                        <button className="btn-qty" onClick={decrement}>
                          -
                        </button>
                        <input
                          type="text"
                          className="qty-input"
                          value={quantity.toString().padStart(2, "0")}
                          readOnly
                        />
                        <button className="btn-qty" onClick={increment}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="price">
                      <span className="currency">₹</span>2405.00{' '}
                      <small>
                        MRP: <span className="currency">₹</span>33679.00
                      </small>
                    </div>
                    <div className="icons">
                      <span>
                        <i className="bi bi-arrow-return-right icon-return"></i> Easy 14 days
                        return & exchange available
                      </span>
                      <span>
                        <i className="bi bi-truck icon-delivery"></i> Estimated delivery by 13
                        aug
                      </span>
                    </div>
                    <div className="actions">
                      <button className="btn">
                        <i className="bi bi-cart"></i> Move to cart
                      </button>
                      <button className="btn">
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Related Products Carousel */}
            <div className="col-md-3">
              <div className="ad-banner mb-4">
                <img src={AdBanner} alt="Special Sale" className="img-fluid" />
              </div>

              <div className="related-products py-4">
                <h4>Related Products</h4>
                <Carousel controls={true} indicators={false}>
                  {relatedProducts.map((product) => (
                    <Carousel.Item key={product.id}>
                      <div className="card h-100 position-relative">
                        <div className="discount-badge">22% off</div>
                        <div className="wishlist-icon">
                          <img src={Icon} alt="Wishlist" />
                        </div>
                        <img
                          src={product.img}
                          className="card-img-top"
                          alt="Product"
                        />
                        <div className="card-body">
                          <h6 className="card-title">{product.title}</h6>
                          <p className="card-text">
                            <strong>{product.price}</strong> <del>{product.originalPrice}</del>
                          </p>
                          <div className="rating d-flex align-items-center mb-2">
                            {[...Array(4)].map((_, i) => (
                              <img key={i} src={Star} className="me-2" alt="star" />
                            ))}
                            <img src="img/star1.svg" className="me-2" alt="half-star" />
                            <span>{product.rating}</span>
                          </div>
                          <p className="emi-text">
                            36-Month Warranty Available
                            <br />
                            EMI starting from ₹1,825/month
                            <br />
                            Express Shipping in 1 day
                          </p>
                        </div>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
