import { useState, useEffect, useCallback, useMemo } from "react";
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
import { fetchSizes } from "../../redux/actions/sizeAction";
import { addToWishlist, deleteWishlistItem } from "../../redux/actions/whishlistAction";
import { fetchUserProductDetailsById } from "../../redux/actions/userProductDetailsAction";
import RelatedProducts from "../../components/relatedProducts";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cartAction";
import { addToGuestCart } from "../../redux/actions/guestCartAction";
import Loader from "../../includes/loader";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/productCard";
export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  // Memoized selectors for redux state
  const sizes = useSelector((state) => state.sizes?.sizes || [], shallowEqual);
  const { product, loading } = useSelector((state) => state.userProductDetails, shallowEqual);
  const relatedProducts = useSelector((state) => state.whishlist.relatedProducts);
  console.log('relatedProducts', relatedProducts);

  // Fetch wishlist only once
  const fetchWishlist = useCallback(async () => {
    setLoadingWishlist(true);
    try {
      const config = { headers: { Authorization: `Bearer ${getToken()}` } };
      const res = await axios.get(`${BASE_URL}/wishlist`, config);
      setWishlistItems(res.data.wishlistItems || []);
    } catch (err) {
      console.error("Failed to load wishlist", err);
    } finally {
      setLoadingWishlist(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // useEffect(() => {
  //   dispatch(fetchSizes());
  // }, [dispatch]);

  // Only fetch product details if first wishlist item changes
  useEffect(() => {
    if (wishlistItems.length > 0) {
      const { product: prod, variantId } = wishlistItems[0];
      const productId = prod?.id;
      if (productId) {
        dispatch(fetchUserProductDetailsById(productId, variantId));
      }
    }
  }, [wishlistItems, dispatch]);

  // Memoize increment/decrement handlers
  const increment = useCallback((item) => {
    const key = `${item.productId}-${item.variantId || 'null'}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.min((prev[key] || 1) + 1, 99),
    }));
  }, []);

  const decrement = useCallback((item) => {
    const key = `${item.productId}-${item.variantId || 'null'}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 1) - 1, 1),
    }));
  }, []);

  const handleProductClick = useCallback((productId, variantId) => {
    if (variantId) {
      navigate(`/product-details/${productId}?variantId=${variantId}`);
    } else {
      navigate(`/product-details/${productId}`);
    }
  }, [navigate]);



  // Memoize handleCart to avoid re-creation
  const handleCart = useCallback(async (item) => {
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
      // setWishlistItems((prev) => prev.filter((w) => w.id !== item.id));
    } catch (error) {
      console.error("Error moving to cart:", error);
      toast.error("Failed to move to cart.");
    }
  }, [dispatch, quantities]);

  // Memoize delete handler
  const handleDelete = useCallback(async (itemId) => {
    await dispatch(deleteWishlistItem(itemId));
    fetchWishlist();
  }, [dispatch, fetchWishlist]);

  return (
    <>
      <Header wishlistCount={wishlistItems.length} />
      <section className="breadcrumb-all py-3" style={{ backgroundColor: "#f4f4f4 !important" }}>
        <div className="container shop">
          <div className="row">
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
              <a href="/orders">My Orders</a>
              <a href="/wishlist" className="active">Wishlist</a>
              <a href="/addressbook">Address book</a>
            </div>

            <div className="col-md-7 ">
              <div class="col-md-12">
                <div class="wishlist-container">
                  <div className="wishlist-header">
                    <h2 className="m-0">WISHLIST</h2>
                  </div>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <p>Loading...</p>
                      </td>
                    </tr>
                  ) : (
                    wishlistItems.length > 0 ? (
                      wishlistItems.map((item, index) => {
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
                        const key = `${item.productId}-${item.variantId || 'null'}`;

                        return (
                          <div key={item.id || index} className="wishlist-item border-between d-flex"  >
                            <div className="col-3" onClick={() => handleProductClick(item.productId, item.variantId)} style={{ cursor: "pointer" }}>
                              <img
                                src={imageUrl}
                                alt={imageAlt}
                                className="wishlist-item-img img-fluid"
                              />
                            </div>
                            <div className="details ms-3">
                              <h5 style={{ cursor: "pointer" }} onClick={() => handleProductClick(item.productId, item.variantId)}>{title}</h5>

                              <div className="d-flex align-items-center mb-3 pt-2">
                                <label className="me-2  fw-semibold text-dark size-wishlist">Size</label>
                                {/* <select className="form-select w-auto me-4" value={displayData.size || "N/A"} disabled>
  <option>{displayData.size || "N/A"}</option>
</select> */}
                                <input
                                  type="text"
                                  className="form-control w-30 me-4"
                                  value={displayData.size || "N/A"}
                                  readOnly
                                // disabled
                                />

                                <label className="me-2 fw-semibold text-dark size-wishlist">Qty</label>
                                <div className="qty-box d-flex align-items-center">
                                  <button className="btn-qty" onClick={() => decrement(item)}>-</button>
                                  <input
                                    type="text"
                                    className="qty-input text-center"
                                    value={(quantities[key] || 1).toString().padStart(2, '0')}
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
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <i className="bi bi-trash"></i> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center">Your wishlist is empty.</p>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Related Products Section */}
            <div className="col-md-3">
              <div className="ad-banner mb-4">
                <img src={AdBanner} alt="Special Sale" className="img-fluid" />
              </div>

              <div className="col-lg-12">  <div className="related-products py-4">
                <h4>Related Products</h4>
                <div className="carousel-wrapper">
                  <Carousel controls indicators={false}>
                    {(relatedProducts || []).map((product) => {
                      const normalizedProduct = {
                        ...product,
                        images: {
                          main: {
                            url: product.imageUrl?.startsWith("http")
                              ? product.imageUrl.replace(`${BASE_URL}/uploads/products/`, "")
                              : product.imageUrl.replace("/uploads/products/", ""),
                          },
                        },
                        mrp: product.mrp,
                        sellingPrice: product.sellingPrice,
                      };

                      return (
                        <Carousel.Item key={product.id}>
                          <ProductCard product={normalizedProduct} size="medium" />
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>


              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
