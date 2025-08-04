import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { getToken, isLoggedIn } from "../../utils/auth";
import BASE_URL from "../../config/config";
import axios from "axios";
import "../../css/user/userstyle.css";
import "../../css/user/whishlist.css";

import Header from "../../includes/header";
import Footer from "../../includes/footer";

import AdBanner from "../../img/ad-banner.png";
import Img3 from "../../img/img3.png";
import Star from "../../img/star.svg";
import Star1 from "../../img/star1.svg";
import Sofa from "../../img/sofa.png";
import Icon from "../../img/icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchSizes } from "../../redux/actions/sizeAction";
import { addToWishlist, deleteWishlistItem } from "../../redux/actions/whishlistAction";
import { fetchUserProductDetailsById } from "../../redux/actions/userProductDetailsAction";
import RelatedProducts from "../../components/relatedProducts";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cartAction";
import { addToGuestCart } from "../../redux/actions/guestCartAction";


export default function WishlistPage() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { sizes = [] } = useSelector((state) => state.sizes || {});
  const { product, loading } = useSelector((state) => state.userProductDetails);
  const [quantities, setQuantities] = useState({});


  const fetchWishlist = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${getToken()}` } };
      const res = await axios.get(`${BASE_URL}/wishlist`, config);
      setWishlistItems(res.data || []);
    } catch (err) {
      console.error("Failed to load wishlist", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch])

  useEffect(() => {
    if (wishlistItems.length > 0) {
      const firstItem = wishlistItems[0];
      const productId = firstItem?.product?.id;
      const variantId = firstItem?.variantId;

      if (productId) {
        dispatch(fetchUserProductDetailsById(productId, variantId));
      }
    }
  }, [wishlistItems, dispatch]);

// const increment = (id) => {
//   setQuantities((prev) => ({
//     ...prev,[id]: Math.min((prev[id] || 1) + 1, 99),
//   }));
// };
// const decrement = (id) => {
//   setQuantities((prev) => ({
//     ...prev,[id]: Math.max((prev[id] || 1) - 1, 1),
//   }));
// };

const increment = (item) => {
  const key = `${item.productId}-${item.variantId || 'null'}`;
  setQuantities((prev) => ({
    ...prev,
    [key]: Math.min((prev[key] || 1) + 1, 99),
  }));
};

const decrement = (item) => {
  const key = `${item.productId}-${item.variantId || 'null'}`;
  setQuantities((prev) => ({
    ...prev,
    [key]: Math.max((prev[key] || 1) - 1, 1),
  }));
};


  const relatedProducts = [
    {
      id: 1,
      title: "Andres Fabric 3 Seater Sofa In Sandy Brown Colour",
      price: "₹37,999",
      originalPrice: "₹48,999",
      img: Img3,
      rating: "4.4 | 24K"
    },
    {
      id: 2,
      title: "Stylish Wingback Chair in Grey Fabric",
      price: "₹21,999",
      originalPrice: "₹28,999",
      img: Img3,
      rating: "4.7 | 10K"
    }
  ];

   const handleCart = async (item) => {
  const productId = item?.productId;
  const variantId = item?.variantId || null;
  const key = `${productId}-${variantId || 'null'}`;
  const qty = quantities[key] || 1;

  const cartItem = {
    productId,
    variantId,
    quantity: qty,
  };

  try {
    if (isLoggedIn()) {
      await dispatch(addToCart(cartItem));
    } else {
      dispatch(addToGuestCart(cartItem));
    }
    setWishlistItems((prev) => prev.filter((w) => w.id !== item.id));
    await dispatch(deleteWishlistItem(item.id));
  } catch (error) {
    console.error("Error moving to cart:", error);
    toast.error("Failed to move to cart.");
  }
};

  return (
    <>
      <Header wishlistCount={wishlistItems.length} />
      <section className="bg-light py-3">
        <div className="container shop">
          <div class="row">
            <div className="col-lg-12">
              <a href=""><strong>My Account</strong></a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container shop">
          <div className="row">
            <div className="col-md-2 sidebars">
              <a href="/profile">Profile</a>
              <a href="/orders">Orders</a>
              <a href="/wishlist" className="active">Wishlist</a>
              <a href="/addressbook">Address book</a>
            </div>
            <div className="col-md-7">
              <div className="wishlist-header">
                <h2 className="m-0">Wishlist</h2>
              </div>

              {wishlistItems.map((item, index) => {
                const displayData = item.variantId && item.variant
                  ? item.variant
                  : (!item.variantId && item.productId && item.product ? item.product : null);

                if (!displayData) return null;

                const imageUrl = displayData.imageUrl
                  ? (displayData.imageUrl.startsWith("http")
                    ? displayData.imageUrl
                    : `${BASE_URL}${displayData.imageUrl}`)
                  : Sofa;

                const imageAlt = displayData.imageAlt || displayData.title || "Product Image";
                const title = displayData.title || "No Title";
                const price = displayData.price || 0;
                const mrp = displayData.mrp || 0;
                const size = displayData.size || "N/A";

                return (
                  <div key={index} className="wishlist-item border-between d-flex">
                    <div className="col-3">
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="wishlist-item-img img-fluid"
                      />
                    </div>
                    <div className="details ms-3">
                      <h5>{title}</h5>
                      <p>36-Month Warranty Available</p>

                      <div className="d-flex align-items-center mb-3">
                        <label className="me-2 fw-semibold">Size</label>
                        <select className="form-select w-auto me-4" value={size}>
                          {sizes.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>

                        <label className="me-2 fw-semibold">Qty</label>
                        <div className="qty-box d-flex align-items-center">
                          <button className="btn-qty" onClick={() => decrement(item)}>-</button>
                          <input
                            type="text"
                            className="qty-input text-center"
                             value={(quantities[`${item.productId}-${item.variantId || 'null'}`] || 1).toString().padStart(2, '0')}
                            readOnly
                          />
                          <button className="btn-qty" onClick={() => increment(item)}>+</button>
                        </div>
                      </div>

                      <div className="price">
                        <span className="currency">₹</span>{price}{" "}
                        <small>MRP: <span className="currency">₹</span>{mrp}</small>
                      </div>

                      <div className="icons">
                        <span>
                          <i className="bi bi-arrow-return-right icon-return"></i> Easy 14 days return & exchange
                        </span>
                        <span>
                          <i className="bi bi-truck icon-delivery"></i> Estimated delivery by 13 Aug
                        </span>
                      </div>

                      <div className="actions mt-3">
                        <button className="btn me-2" onClick={() => handleCart(item)}>
                          <i className="bi bi-cart"></i> Move to cart
                        </button>
                        <button
                          className="btn"
                          onClick={async () => {
                            await dispatch(deleteWishlistItem(item.id));
                            fetchWishlist();
                            toast.success("Removed from wishlist successfully")
                          }}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Related Products Section */}
            <div className="col-md-3">
              <div className="ad-banner mb-4">
                <img src={AdBanner} alt="Special Sale" className="img-fluid" />
              </div>

              <div className="related-products py-4">
                <h4>Related Products</h4>
                <Carousel controls indicators={false}>
                  {relatedProducts.map((product) => (
                    <Carousel.Item key={product.id}>
                      <div className="card h-100 position-relative">
                        <div className="discount-badge">22% off</div>
                        <div className="wishlist-icon">
                          <img src={Icon} alt="Wishlist" />
                        </div>
                        <img src={product.img} className="card-img-top" alt="Product" />
                        <div className="card-body">
                          <h6 className="card-title">{product.title}</h6>
                          <p className="card-text">
                            <strong>{product.price}</strong>{" "}
                            <del>{product.originalPrice}</del>
                          </p>
                          <div className="rating d-flex align-items-center mb-2">
                            {[...Array(4)].map((_, i) => (
                              <img key={i} src={Star} className="me-1" alt="star" />
                            ))}
                            <img src={Star1} className="me-1" alt="half-star" />
                            <span>{product.rating}</span>
                          </div>
                          <p className="emi-text">
                            36-Month Warranty Available<br />
                            EMI starting from ₹1,825/month<br />
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
      <Footer />
    </>
  );
}
