import React, { useState, useEffect, useRef } from "react";
import Header from "../includes/header";
import Footer from "../includes/footer";
import '../css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import P1 from '../../src/img/p1.png';
import Img1 from '../../src/img/img1.png';
import Img2 from '../../src/img/img2.png';
import Img3 from '../../src/img/img3.png';
import Icon from '../../src/img/icon.svg';
import Star from '../../src/img/star.svg';
import Star1 from '../../src/img/star1.svg';
import LocalShipping from '../../src/img/local_shipping.png';
import G1 from '../../src/img/g1.png';
import SampleSofa from '../img/sofa.png';
import ReviewSection from "./reviewSection";
import { Link } from "react-router-dom";

//footerlinks
//headerlinks

export default function ProductDetailPage() {
  useEffect(() => {
    const mainImage = document.getElementById("mainImage");
    const zoomResult = document.getElementById("zoomResult");
    const zoomLens = document.querySelector(".zoom-lens");
    const imageContainer = document.getElementById("mainImageContainer");

    if (!mainImage || !zoomResult || !zoomLens || !imageContainer) return;

    const zoomLevel = 2.5;
    let imgWidth, imgHeight;

    const updateImageDimensions = () => {
      imgWidth = mainImage.offsetWidth;
      imgHeight = mainImage.offsetHeight;
      if (imgWidth === 0 || imgHeight === 0) return;
      zoomResult.style.backgroundSize = `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`;
      const lensWidth = Math.min(100, imgWidth / 4);
      const lensHeight = Math.min(100, imgHeight / 4);
      zoomLens.style.width = `${lensWidth}px`;
      zoomLens.style.height = `${lensHeight}px`;
    };

    const moveLens = (e) => {
      e.preventDefault();
      const rect = mainImage.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      const lensWidth = zoomLens.offsetWidth;
      const lensHeight = zoomLens.offsetHeight;
      x = Math.max(lensWidth / 2, Math.min(x, imgWidth - lensWidth / 2));
      y = Math.max(lensHeight / 2, Math.min(y, imgHeight - lensHeight / 2));
      zoomLens.style.left = `${x - lensWidth / 2}px`;
      zoomLens.style.top = `${y - lensHeight / 2}px`;

      const ratioX = (x - lensWidth / 2) / (imgWidth - lensWidth);
      const ratioY = (y - lensHeight / 2) / (imgHeight - lensHeight);
      zoomResult.style.backgroundPosition = `${Math.max(0, Math.min(ratioX * 100, 100))}% ${Math.max(0, Math.min(ratioY * 100, 100))}%`;
    };

    zoomResult.style.backgroundImage = `url('${mainImage.src}')`;
    updateImageDimensions();

    window.addEventListener("resize", updateImageDimensions);
    mainImage.addEventListener("load", updateImageDimensions);

    imageContainer.addEventListener("mouseenter", () => {
      if (window.innerWidth > 576) {
        zoomLens.style.display = "block";
        zoomResult.style.display = "block";
        updateImageDimensions();
      }
    });

    imageContainer.addEventListener("mouseleave", () => {
      zoomLens.style.display = "none";
      zoomResult.style.display = "none";
    });

    imageContainer.addEventListener("mousemove", moveLens);

    return () => {
      window.removeEventListener("resize", updateImageDimensions);
    };
  }, []);

  const checkDelivery = () => {
    const pincode = document.getElementById("pincode").value;
    if (pincode) {
      alert(`Checking delivery for PIN code: ${pincode}`);
    } else {
      alert("Please enter a PIN code");
    }
  };

  const thumbnails = Array(10).fill({ P1 });

  const [mainImage, setMainImage] = useState(P1);

  // Function to change the main image
  const changeImage = (newImage) => {
    setMainImage(newImage);
  };

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [pincode, setPincode] = useState('');

  const handleChat = () => alert('Chat selected!');
  const handleCart = () => alert('Added to Cart!');
  const handleBuy = () => alert('Buy Now clicked!');
  const handleWishlist = () => alert('Added to Wishlist!');
  const handlePincodeCheck = () => {
    if (pincode) alert(`Checking delivery for PIN code: ${pincode}`);
    else alert('Please enter a PIN code');
  };

  const products = [
    {
      id: 1,
      image: { Img1 },
      title: 'Andres Fabric 3 Seater Sofa In Sandy Brown Colour',
      price: 37999,
      originalPrice: 48999,
      rating: 4.4,
      reviews: '24K',
    },
    {
      id: 2,
      image: { Img1 },
      title: 'Andres Fabric 3 Seater Sofa In Sandy Brown Colour',
      price: 37999,
      originalPrice: 48999,
      rating: 4.4,
      reviews: '24K',
    },
    {
      id: 3,
      image: { Img2 },
      title: 'Andres Fabric 3 Seater Sofa In Sandy Brown Colour',
      price: 37999,
      originalPrice: 48999,
      rating: 4.4,
      reviews: '24K',
    },
    {
      id: 4,
      image: { Img3 },
      title: 'Andres Fabric 3 Seater Sofa In Sandy Brown Colour',
      price: 37999,
      originalPrice: 48999,
      rating: 4.4,
      reviews: '24K',
    },
  ];


  return (
    <>
      <Header />
      <nav className="breadcrumb-section py-3" aria-label="breadcrumb">
        <div className="container">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">Sofas</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="#">Sofa Sets</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Andres Fabric 3 Seater Sofa In Sandy Brown Colour
            </li>
          </ol>
        </div>
      </nav>

      <section class="product-details-page">
        <div class="container mt-5">
          <div class="row">
            <div className="col-md-6">
              <div className="product-main-view">
                <div class="thumb-gallery">
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                  <div class="thumb-item" onClick={() => changeImage('../../src/img/p1.png')}>
                    <img src={P1} alt="Thumbnail 1" class="img-fluid" />
                  </div>
                </div>
              

               <div class="product-display mb-3" id="mainImageContainer">
                            <div class="zoom-lens"></div>
                            <img src={P1} alt="Product Image" class="img-fluid product-image" id="mainImage"/>
                        </div>
                        <div class="zoom-result" id="zoomResult"></div>
              </div>

              {/* Buy it with section */}
              <div className="d-none d-sm-block">
                <div className="row">
                  <h4>Buy it with</h4>
                  {[1, 2].map((_, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="card h-100 position-relative">
                        <div className="discount-badge">22% off</div>
                        <div className="wishlist-icon">
                          <img src={Icon} alt="Wishlist" />
                        </div>
                        <img src={Img1} className="card-img-top" alt="Sofa" />
                        <div className="card-body">
                          <h6 className="card-title">
                            Andres Fabric 3 Seater Sofa In Sandy Brown Colour
                          </h6>
                          <p className="card-text">
                            <strong>₹37,999</strong> <del>MRP ₹48,999</del>
                          </p>
                          <div className="rating d-flex align-items-center mb-2">
                            <img src={Star} className="me-2" alt="star" />
                            <img src={Star} className="me-2" alt="star" />
                            <img src={Star} className="me-2" alt="star" />
                            <img src={Star} className="me-2" alt="star" />
                            <img src={Star1} className="me-2" alt="star-half" />
                            <span>4.4 | 24K</span>
                          </div>
                          <p className="emi-text">
                            36-Month Warranty Available<br />
                            EMI starting from ₹1,825/month<br />
                            Express Shipping in 1 day
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="product-title">
                Product Name <span className="stock-status">5 left</span>
              </h2>
              <div className="d-flex align-items-center mb-2">
                <span className="rating-stars">★★★★★</span>
                <span className="review-text">4.0 (3K+ Reviews)</span>
              </div>
              <div className="price-details">
                <div>
                  <span className="price-value">₹2405.00</span>
                  <span className="discount-label">Flat 40% off</span>
                </div>
                <span className="original-price">MRP: ₹3267.00</span>
                <p className="tax-info">Inclusive of all taxes</p>
                <p className="emi-info">
                  EMI starts at ₹122 per month. <a href="#">EMI options</a>
                </p>
              </div>

              <div className="option-row mb-1">
                <div className="dropdown-container">
                  <label className="dropdown-label">Select Size</label>
                  <select
                    className="form-select1 size-dropdown"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}>
                    <option value="">Select</option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                  </select>
                </div>
                <div className="dropdown-container">
                  <label className="dropdown-label">Select Color</label>
                  <select
                    className="form-select1 color-dropdown"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}>
                    <option value="">Select</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                  </select>
                </div>
              </div>

              <div className="chat-button-row">
                <button className="chat-button" onClick={handleChat}>Select Chat</button>
              </div>

              <div className="action-buttons mb-3">
                <button className=" add-to-cart-btn" onClick={handleCart}>
                  <i className="bi bi-cart3"></i> Add to Cart
                </button>
                <button className=" buy-now-btn" onClick={handleBuy}>
                  <i className="bi bi-lightning-charge-fill"></i> Buy Now
                </button>
                <button className="add-to-wishlist-btn" onClick={handleWishlist}>
                  <i className="bi bi-heart"></i> Add to Wishlist
                </button>
              </div>

              <div className="delivery-options">
                <h5>Delivery Options</h5>
                <div className="pincode-wrapper">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="pincode-input"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button className="check-btn" onClick={handlePincodeCheck}>Check</button>
                </div>
                <p className="note-text">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
                <div className="delivery-date">
                  <img src={LocalShipping} alt="Truck" className="delivery-icon" />
                  Get it by Sat, Nov 18
                </div>
                <hr />
                <div className="features">
                  {[...Array(5)].map((_, i) => (
                    <div className="feature-items" key={i}>
                      <div className="icon-box">
                        <img src={G1} alt="Feature Icon" />
                      </div>
                      <p>{[
                        'Pay on delivery available',
                        'Free Delivery',
                        'Top Brand',
                        'Secure transaction',
                        'Easy 14 days return & exchange available'][i]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="offer-details">
                <h5>Best Offers</h5>
                <p>Best Price: Rs. 1999</p>
                <ul>
                  <li>Applicable on: Orders above Rs. 750 (only on first purchase)</li>
                  <li>Coupon code: <strong>SALESOFA</strong></li>
                  <li>Coupon Discount: Rs. 300 off (check cart for final savings)</li>
                </ul>
                <p><a href="#">VIEW ELIGIBLE PRODUCTS</a></p>
                <div className="discount-banner">
                  <p>
                    <span>7.5% Discount</span> on Myntra Kotak Credit Card, Max Discount Up to ₹750 on every spends,{' '}
                    <a href="#">Terms & Conditions</a>
                  </p>
                </div>
              </div>

              <div className="product-details">
                <h5>Product Details</h5>
                <p>Slip into this snug sofa from Indnity and look your very best. This maroon piece is incredibly versatile and can be matched with dark or light denim for an evening out with the guys.</p>
                <div>
                  <h6>Size & Fit</h6>
                  <p>The model (height 6') is wearing a size M</p>
                </div>
                <div className="two-column">
                  <div>
                    <h6>Material & Care</h6>
                    <p>Cotton, Machine-wash</p>
                  </div>
                  <div>
                    <h6>Specifications</h6>
                    <p>Cotton, Machine-wash</p>
                  </div>
                </div>
                <div className="multi-column">
                  <div><h6>Assembly</h6><p>Carpenter Assembly</p></div>
                  <div><h6>Collections</h6><p>Andres</p></div>
                  <div><h6>Dimensions (in inches)</h6><p>H 32 x W 62 x D 34</p></div>
                  <div><h6>Seating Height</h6><p>18.1</p></div>
                  <div><h6>Warranty</h6><p>36 Months' Warranty</p></div>
                  <div><h6>SKU</h6><p>FNI745917-S-WH32456</p></div>
                  <div><h6>Room Type</h6><p>Living Room</p></div>
                  <div><h6>Sofa Firmness</h6><p>Medium</p></div>
                  <div><h6>Primary Material</h6><p>Fabric</p></div>
                  <div><h6>Weight</h6><p>50 KG</p></div>
                </div>
                <div className="view-more"><a href="#">View More Details</a></div>
              </div>
            </div>
          </div>

          <div class="container Fabric pb-4">
            <h3>Releted Products</h3>
            <div class="row row-cols-1 row-cols-md-4 g-4">
              {/* <!-- Card 1 --> */}
              <div class="col-lg-3 p-2">
                <div class="card h-100 position-relative">
                  <div class="discount-badge">22% off</div>
                  <div class="wishlist-icon"><img src={Icon} /></div>
                  <img src={Img1} class="card-img-top" alt="Sofa" />
                  <div class="card-body">
                    <h6 class="card-title">
                      Andres Fabric 3 Seater Sofa In Sandy Brown Colour
                    </h6>
                    <p class="card-text">
                      <strong>₹37,999</strong> <del>MRP ₹48,999</del>
                    </p>
                    <div class="rating d-flex align-items-center mb-2">
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star1} className="me-2" /><span>4.4 | 24K</span>
                    </div>
                    <p class="emi-text">
                      36-Month Warranty Available<br />
                      EMI starting from ₹1,825/month<br />
                      Express Shipping in 1 day
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- Card 2 --> */}
              <div class="col-lg-3 p-2">
                <div class="card h-100 position-relative">
                  <div class="discount-badge">22% off</div>
                  <div class="wishlist-icon"><img src={Icon} /></div>
                  <img src={Img1} class="card-img-top" alt="Sofa" />
                  <div class="card-body">
                    <h6 class="card-title">
                      Andres Fabric 3 Seater Sofa In Sandy Brown Colour
                    </h6>
                    <p class="card-text">
                      <strong>₹37,999</strong> <del>MRP ₹48,999</del>
                    </p>
                    <div class="rating d-flex align-items-center mb-2">
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star1} className="me-2" /><span>4.4 | 24K</span>
                    </div>
                    <p class="emi-text">
                      36-Month Warranty Available<br />
                      EMI starting from ₹1,825/month<br />
                      Express Shipping in 1 day
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- Card 3 --> */}
              <div class="col-lg-3 p-2">
                <div class="card h-100 position-relative">
                  <div class="discount-badge">22% off</div>
                  <div class="wishlist-icon"><img src={Icon} /></div>
                  <img src={Img2} class="card-img-top" alt="Sofa" />
                  <div class="card-body">
                    <h6 class="card-title">
                      Andres Fabric 3 Seater Sofa In Sandy Brown Colour
                    </h6>
                    <p class="card-text">
                      <strong>₹37,999</strong> <del>MRP ₹48,999</del>
                    </p>
                    <div class="rating d-flex align-items-center mb-2">
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star1} className="me-2" /><span>4.4 | 24K</span>
                    </div>
                    <p class="emi-text">
                      36-Month Warranty Available<br />
                      EMI starting from ₹1,825/month<br />
                      Express Shipping in 1 day
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- Card 4 --> */}
              <div class="col-lg-3 p-2">
                <div class="card h-100 position-relative">
                  <div class="discount-badge">22% off</div>
                  <div class="wishlist-icon"><img src={Icon} /></div>
                  <img src={Img3} class="card-img-top" alt="Sofa" />
                  <div class="card-body">
                    <h6 class="card-title">
                      Andres Fabric 3 Seater Sofa In Sandy Brown Colour
                    </h6>
                    <p class="card-text">
                      <strong>₹37,999</strong> <del>MRP ₹48,999</del>
                    </p>
                    <div class="rating d-flex align-items-center mb-2">
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star} className="me-2" />
                      <img src={Star1} className="me-2" /><span>4.4 | 24K</span>
                    </div>
                    <p class="emi-text">
                      36-Month Warranty Available<br />
                      EMI starting from ₹1,825/month<br />
                      Express Shipping in 1 day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Customer Reviews Section --> */}
         <ReviewSection/>
        </div>

      </section>


      {/* Product Image and Zoom */}
      {/* <div id="mainImageContainer" className="position-relative">
        <img id="mainImage" src={SampleSofa} alt="Product" className="img-fluid" />
        <div className="zoom-lens position-absolute" style={{ display: "none" }}></div>
        <div id="zoomResult" className="zoom-result" style={{ display: "none" }}></div>
      </div> */}

      {/* Check Delivery */}
      {/* <div className="container mt-4">
        <input
          type="text"
          id="pincode"
          placeholder="Enter PIN code"
          className="form-control w-25 d-inline-block me-2"
        />
        <button className="btn btn-primary" onClick={checkDelivery}>
          Check Delivery
        </button>
      </div> */}

      <Footer />
    </>
  );
}
