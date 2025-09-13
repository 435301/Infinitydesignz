import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import axios from "axios";
import BASE_URL from "../../config/config";
import "../../css/user/userstyle.css";
import "../../css/user/bootstrap-icons.css";
import G1 from "../../img/g1.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProductDetailsById } from "../../redux/actions/userProductDetailsAction";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import Loader from "../../includes/loader";
import { fetchCategories } from "../../redux/actions/categoryAction";
import RelatedProducts from "../../components/relatedProducts";
import { setSelectedVariant } from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartAction";
import { isLoggedIn } from "../../utils/auth";
import { addToGuestCart } from "../../redux/actions/guestCartAction";
import { addToWishlist, deleteWishlistItem, fetchWishlist } from "../../redux/actions/whishlistAction";
import { toast } from "react-toastify";
import OtpLoginModal from "../../components/otpLoginModal";
import { setBuyNow } from "../../redux/actions/buyNowAction";
import { Row } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const variantIdFromURL = searchParams.get("variantId");
  const [thumbnails, setThumbnails] = useState([]);
  const [qty, setQty] = useState(1);
  const { product, loading } = useSelector((state) => state.userProductDetails);
  const categories = useSelector((state) => state.categories.categories || []);
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);
  const wishlistItems = useSelector((state) => state.whishlist.items);
  console.log('wishlistItems', wishlistItems);
  const [localWishlisted, setLocalWishlisted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [postLoginAction, setPostLoginAction] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // Memoize category hierarchy to avoid recalculation
  const getCategoryHierarchy = useCallback((categoryId, allCategories) => {
    const result = [];
    let current = allCategories.find(cat => cat.id === categoryId);
    while (current) {
      result.unshift(current);
      current = allCategories.find(cat => cat.id === current.parentId);
    }
    return result;
  }, []);

  const toSlug = (title = "") =>
    String(title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const makeSlug = (title, id) => `${toSlug(title)}-${id}`;



  // Memoize breadcrumb items
  const breadcrumbItems = useMemo(() => {
    if (!product) return [{ label: "Home", link: "/" }];
    const hierarchy = getCategoryHierarchy(product.category?.id, categories);
    const crumbs = [{ label: "Home", link: "/" }];

    // For each category index, build a link where:
    // - all previous segments use toSlug(title)
    // - the current segment uses makeSlug(title, id)
    hierarchy.forEach((cat, idx) => {
      const segments = hierarchy
        .map((c, k) => (k < idx ? toSlug(c.title) : k === idx ? makeSlug(c.title, c.id) : null))
        .filter(Boolean);

      crumbs.push({
        label: cat.title,
        link: `/products/${segments.join("/")}`,
      });
    });

    crumbs.push({ label: product.title });
    return crumbs;
  }, [product, categories, getCategoryHierarchy]);



  useEffect(() => {
    dispatch(fetchUserProductDetailsById(productId, variantIdFromURL));
    dispatch(fetchCategories());
    dispatch(fetchWishlist());
  }, [dispatch, productId, variantIdFromURL]);


  // Memoize zoom handlers to avoid unnecessary re-creation
  useEffect(() => {
    if (!product) {
      console.log('No product data available');
      return;
    }

    console.log('Image selection useEffect triggered:', {
      variantIdFromURL,
      selectedVariant: product.selectedVariant,
      variantImages: product.images?.variants,
      flatVariantImages: product.variantImages,
    });

    // Use selectedVariant.id if available, otherwise fallback to variantIdFromURL
    const variantId = product.selectedVariant?.id
      ? parseInt(product.selectedVariant.id)
      : parseInt(variantIdFromURL) || null;

    console.log('Selected variantId:', variantId);

    let selectedImages = [];

    if (variantId) {
      // Try structured variant images (product.images.variants)
      const variantImagesObj = product.images?.variants?.[variantId];
      if (variantImagesObj) {
        const mainImg = variantImagesObj.main;
        const additionalImgs = variantImagesObj.additional || [];
        selectedImages = [
          ...(mainImg ? [{ url: mainImg.url, isMain: true }] : []),
          ...additionalImgs.map((img) => ({ url: img.url, isMain: img.isMain })),
        ];
        console.log('Using structured variant images:', selectedImages);
      } else {
        // Fallback to flat variantImages array
        const variantImagesFlat = (product.variantImages || []).filter(
          (img) => parseInt(img.variantId) === variantId
        );
        selectedImages = variantImagesFlat.map((img) => ({ url: img.url, isMain: img.isMain }));
        console.log('Using flat variant images:', selectedImages);
      }
    }

    // Only update images if we have valid selectedImages or need to fallback
    if (selectedImages.length > 0) {
      const mainVariantImg = selectedImages.find((img) => img.isMain) || selectedImages[0];
      setMainImage(`${BASE_URL}/Uploads/products/${mainVariantImg.url}`);
      setThumbnails(selectedImages);
      console.log('Setting main image:', mainVariantImg.url);
    } else {
      // Fallback to product-level images
      const mainImgUrl = product.images?.main?.url;
      const additional = product.images?.additional || [];
      console.log('Falling back to main product image:', mainImgUrl);
      if (mainImgUrl) {
        setMainImage(`${BASE_URL}/Uploads/products/${mainImgUrl}`);
      }
      setThumbnails([
        ...(mainImgUrl ? [{ url: mainImgUrl, isMain: true }] : []),
        ...additional.map((img) => ({ url: img.url, isMain: img.isMain })),
      ]);
    }

    // Sync size and color selections ONLY when a selectedVariant exists
    if (product?.selectedVariant) {
      setSelectedSizeId(product.selectedVariant.sizeId?.toString() ?? '');
      setSelectedColorId(product.selectedVariant.colorId?.toString() ?? '');
    }
  }, [product, variantIdFromURL, product?.selectedVariant]);

  useEffect(() => {
    const mainImg = document.getElementById("mainImage");
    const zoomResult = document.getElementById("zoomResult");
    const zoomLens = document.querySelector(".zoom-lens");
    const imageContainer = document.getElementById("mainImageContainer");

    if (!mainImg || !zoomResult || !zoomLens || !imageContainer) return;

    const zoomLevel = 2.5;
    let imgWidth, imgHeight;

    const updateImageDimensions = () => {
      imgWidth = mainImg.offsetWidth;
      imgHeight = mainImg.offsetHeight;
      if (imgWidth === 0 || imgHeight === 0) return;

      zoomResult.style.backgroundSize = `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`;

      const lensWidth = Math.min(100, imgWidth / 4);
      const lensHeight = Math.min(100, imgHeight / 4);
      zoomLens.style.width = `${lensWidth}px`;
      zoomLens.style.height = `${lensHeight}px`;
    };

    const moveLens = (e) => {
      e.preventDefault();
      const rect = mainImg.getBoundingClientRect();
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

      zoomResult.style.backgroundPosition = `${ratioX * 100}% ${ratioY * 100}%`;
    };

    zoomResult.style.backgroundImage = `url('${mainImage}')`;

    updateImageDimensions();

    window.addEventListener("resize", updateImageDimensions);
    mainImg.addEventListener("load", updateImageDimensions);

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
      mainImg.removeEventListener("load", updateImageDimensions);
      imageContainer.removeEventListener("mouseenter", updateImageDimensions);
      imageContainer.removeEventListener("mouseleave", updateImageDimensions);
      imageContainer.removeEventListener("mousemove", moveLens);
    };
  }, [mainImage]);

  // Memoize handlers to avoid unnecessary re-renders
  const handleChat = useCallback(() => alert("Chat selected!"), []);
  const handleCart = useCallback(() => {
    const cartItem = {
      productId: parseInt(productId),
      variantId: parseInt(variantIdFromURL) || null,
      quantity: qty,
    };
    if (isLoggedIn()) {
      dispatch(addToCart(cartItem));
    } else {
      dispatch(addToGuestCart(cartItem));
    }
  }, [dispatch, productId, variantIdFromURL, qty]);

  const parsedProductId = parseInt(productId);
  const parsedVariantId = variantIdFromURL ? parseInt(variantIdFromURL) : null;

  const wishlistItem = wishlistItems.find(
    (item) =>
      item.productId === parsedProductId &&
      (!parsedVariantId || item.variantId === parsedVariantId)
  );
  const isWishlisted = Boolean(wishlistItem);
  console.log('wishlistItem', wishlistItem?.id);

  useEffect(() => {
    setLocalWishlisted(isWishlisted);
  }, [isWishlisted]);

  // Centralized login trigger function
  const triggerLogin = useCallback((actionCallback) => {
    if (!isLoggedIn()) {
      setPostLoginAction(() => actionCallback); // Store the action to perform after login
      setShowLogin(true);
      return false;
    }
    return true;
  }, []);

  const handleWishlist = useCallback(async () => {
    const wishlistAction = async () => {
      if (wishlistItem?.id) {
        await dispatch(deleteWishlistItem(wishlistItem.id));
        setLocalWishlisted(false);
      } else {
        const res = await dispatch(addToWishlist(parsedProductId, parsedVariantId));
        if (res?.payload?.id) {
          setLocalWishlisted(true);
        }
      }
    };

    if (triggerLogin(wishlistAction)) {
      await wishlistAction(); // Execute immediately if logged in
    }
  }, [dispatch, wishlistItem, parsedProductId, parsedVariantId, triggerLogin]);

  const handleBuy = useCallback(() => {
    const buyAction = () => {
      const payload = {
        productId: parseInt(productId),
        variantId: variantIdFromURL ? parseInt(variantIdFromURL) : null,
        quantity: qty
      };
      dispatch(setBuyNow(payload, navigate));
    };

    if (triggerLogin(buyAction)) {
      buyAction();
    }
  }, [dispatch, navigate, productId, variantIdFromURL, qty, triggerLogin]);

  const handlePincodeCheck = async () => {
    if (!pincode) {
      return;
    }
    if (checked) {
      // If already checked → reset state
      setChecked(false);
      setResult(null);
      return;
    }
    try {
      setResult(null);
      const res = await axios.get(`${BASE_URL}/pincode/${pincode}`);
      setResult(res.data);
      setChecked(true);
    } catch (err) {
      console.error('Pincode check failed:', err);
    }
  };

  // Memoize dropdown options
  const sizeOptions = useMemo(() => {
    if (!product || !product.variants) return [];
    return [...new Map(product.variants.map(v => [v.size?.id, v.size])).values()].filter(Boolean);
  }, [product]);
  const colorOptions = useMemo(() => {
    if (!product || !product.variants) return [];
    return [...new Map(product.variants.map(v => [v.color?.id, v.color])).values()].filter(color => color?.id);
  }, [product]);

  // Early return for loading state
  if (loading) return <Loader />;
  if (!product) return <div className="container my-5">Loading...</div>;

  const { title, brand, description, mrp, sellingPrice, stock, size, productDetails, variants, selectedVariant } = product;

  return (
    <>
      <Header />
      <section className="product-details-page">
        <section className=" py-3 breadcrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 product-span">
                {breadcrumbItems.map((item, index) => (
                  <span key={index}>
                    {item.link ? (
                      <Link to={item.link} className=" breadcrumb-hover" style={{ textDecoration: "none", color: "#333" }}>{item.label}</Link>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {index < breadcrumbItems.length - 1 && <span className="mx-2">{">"}</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="product-main-view">
                <div className="gap-2">
                  <div className="thumb-gallery">
                    {thumbnails.map((img, index) => (
                      <div
                        key={index}
                        className="thumb-item mb-2"
                        onClick={() => setMainImage(`${BASE_URL}/Uploads/products/${img.url}`)}
                        style={{
                          cursor: "pointer",
                          border: mainImage.includes(img.url) ? "2px solid #007bff" : "1px solid #ddd",
                          borderRadius: 4
                        }}
                      >
                        <img
                          src={`${BASE_URL}/Uploads/products/${img.url}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="img-fluid"
                          style={{ width: "70px", height: "85px", objectFit: "cover" }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="product-display mb-3" id="mainImageContainer" style={{ position: "relative" }}>
                    <div className="zoom-lens" style={{ position: "absolute", display: "none" }}></div>
                    <img
                      src={mainImage}
                      alt={title}
                      className="img-fluid product-image w-100"
                      id="mainImage"
                      loading="lazy"
                    />
                    <div className="zoom-result" id="zoomResult" style={{ display: "none" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="product-title mb-2">
                {title.charAt(0).toUpperCase() + title.slice(1)}{" "} <span className="stock-status">{selectedVariant?.stock ?? product?.stock} left</span>
              </h2>

              <div className="price-details">
                <div>
                  <span className="price-value">
                    ₹
                    {selectedVariant && selectedVariant.sellingPrice
                      ? selectedVariant.sellingPrice
                      : product?.sellingPrice}
                  </span>

                  <span className="discount-label mx-1">
                    {(() => {
                      const mrp = selectedVariant ? selectedVariant.mrp : product?.mrp;
                      const sp = selectedVariant ? selectedVariant.sellingPrice : product?.sellingPrice;
                      if (mrp && sp && mrp > sp) {
                        const discount = Math.round(((mrp - sp) / mrp) * 100);
                        return `Flat ${discount}% off`;
                      } else {
                        return "No discount";
                      }
                    })()}
                  </span>
                </div>

                <span className="original-price">
                  MRP: ₹
                  {selectedVariant && selectedVariant.mrp
                    ? selectedVariant.mrp
                    : product?.mrp}
                </span>

                <p className="tax-info">Inclusive of all taxes</p>
              </div>
              <div className="dropdown-container ">
                <div className="row">
                  {/* Size Dropdown */}
                  {sizeOptions.length > 0 && (
                    <div className="col-md-6 mb-2">
                      <label className="dropdown-label">Select Size</label>
                      <select
                        className="form-select1 size-dropdown w-100"
                        value={selectedSizeId}
                        onChange={(e) => {
                          const newSizeId = parseInt(e.target.value);
                          setSelectedSizeId(newSizeId.toString());

                          // All variants for this size
                          const sizeVariants = variants.filter(v => Number(v.size?.id) === newSizeId);

                          // Prefer current color if that exact combo exists
                          let next = sizeVariants.find(v => selectedColorId && Number(v.color?.id) === Number(selectedColorId));

                          // Otherwise fall back to the first available for this size
                          if (!next) next = sizeVariants[0];

                          if (next) {
                            dispatch(setSelectedVariant(next));
                            if (next.color?.id) setSelectedColorId(String(next.color.id)); // keep color dropdown in sync
                          }
                        }}

                      >
                        {/* <option value="">Select</option> */}
                        {sizeOptions.map(size => (
                          <option key={size.id} value={size.id}>
                            {size.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Color Dropdown */}
                  {colorOptions.length > 0 && (
                    <div className="col-md-6 mb-2">
                      <label className="dropdown-label">Select Color</label>
                      <select
                        className="form-select1 color-dropdown w-100"
                        value={selectedColorId}
                        onChange={(e) => {
                          const newColorId = parseInt(e.target.value);
                          setSelectedColorId(newColorId.toString());

                          // All variants with this color
                          const colorVariants = variants.filter(v => Number(v.color?.id) === newColorId);

                          // Prefer current size if that exact combo exists
                          let next = colorVariants.find(v => selectedSizeId && Number(v.size?.id) === Number(selectedSizeId));

                          // Otherwise fall back to the first available for this color
                          if (!next) next = colorVariants[0];

                          if (next) {
                            dispatch(setSelectedVariant(next));
                            if (next.size?.id) setSelectedSizeId(String(next.size.id)); // keep size dropdown in sync
                          }
                        }}

                      >
                        {/* <option value="">Select</option> */}
                        {colorOptions.map(color => (
                          <option key={color.id} value={color.id}>
                            {color.label || "N/A"}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="chat-button-row">
                <button className="chat-button" onClick={handleChat}>
                  Select Chat
                </button>
              </div>

              <div className="action-buttons mb-3">
                <button className="add-to-cart-btn" onClick={handleCart}>
                  <i className="bi bi-cart3"></i> Add to Cart
                </button>
                <button className="buy-now-btn" onClick={handleBuy}>
                  <i className="bi bi-lightning-charge-fill"></i> Buy Now
                </button>
                <button
                  className="add-to-wishlist-btn"
                  onClick={handleWishlist}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <i className={`bi ${localWishlisted ? "bi-heart-fill" : "bi-heart"}`}></i>{" "}
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
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
                  <button className="check-btn" onClick={handlePincodeCheck}>
                    {checked ? "Uncheck" : "Check"}
                  </button>
                </div>
                {checked && result && (
                  <div style={{ marginTop: "10px" }}>
                    <p><strong>Pincode:</strong> {result.pincode}</p>
                    <p><strong>Available:</strong> {result.available ? "Yes" : "No"}</p>
                    {result.area ? (
                      <p>
                        <strong>Area:</strong> {result.area.city}, {result.area.state}
                      </p>
                    ) : (
                      <p><strong>Area:</strong> N/A</p>
                    )}
                    <p><strong>COD Available:</strong> {result.codAvailable ? "Yes" : "No"}</p>
                    <p><strong>ETA Days:</strong> {result.etaDays ?? "N/A"}</p>
                    <p><strong>Fee:</strong> {result.fee !== null ? `₹${result.fee}` : "N/A"}</p>
                  </div>
                )}
                <p className="note-text">
                  Please enter PIN code to check delivery time & Pay on Delivery Availability
                </p>
                <hr />
                <div className="features">
                  {[
                    "Pay on delivery available",
                    "Free Delivery",
                    "Top Brand",
                    "Secure transaction",
                    "Easy 14 days return & exchange available"
                  ].map((text, i) => (
                    <div className="feature-items" key={i}>
                      <div className="icon-box">
                        <img src={G1} alt="Feature Icon" loading="lazy" />
                      </div>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-details">
                <h5>Product Details</h5>
                <h6 className="mb-0">Description :</h6>
                <p className="mb-0 mt-0" dangerouslySetInnerHTML={{ __html: description }} />
                <div className="multi-column mt-2">
                  <div className="mb-2">
                    <h6>Size</h6>
                    <p>{selectedVariant?.size?.title || product.size?.title || "N/A"}</p>
                  </div>
                  <div className="mb-2">
                    <h6>Color</h6>
                    <p>{selectedVariant?.color?.label || product.color?.label || "N/A"}</p>
                  </div>
                  <div className="mb-2">
                    <h6>Dimensions (in inches)</h6>
                    <p>
                      {(selectedVariant?.height || product.height) ? `H ${selectedVariant?.height || product.height}` : 'H N/A'} ×{' '}
                      {(selectedVariant?.width || product.width) ? `W ${selectedVariant?.width || product.width}` : 'W N/A'} ×{' '}
                      {(selectedVariant?.length || product.length) ? `L ${selectedVariant?.length || product.length}` : 'L N/A'}
                    </p>
                  </div>
                  <div>
                    <h6>SKU</h6>
                    <p>{selectedVariant?.sku || product?.sku}</p>
                  </div>
                  <div>
                    <h6>Weight</h6>
                    <p>{selectedVariant?.weight ?? productDetails?.weight} gms</p>
                  </div>
                  <div>
                    <h6>Stock</h6>
                    <p>{selectedVariant?.stock ?? product?.stock}</p>
                  </div>
                  <div>
                    <h6>Delivery Charges</h6>
                    <p>
                      {((selectedVariant?.deliveryCharges ?? productDetails?.deliveryCharges) || 0) === 0
                        ? "Free Delivery"
                        : `₹${selectedVariant?.deliveryCharges ?? productDetails?.deliveryCharges}`}
                    </p>
                  </div>
                  <div>
                    <h6>SLA</h6>
                    <p>{selectedVariant?.sla ?? productDetails?.sla} Days</p>
                  </div>
                </div>

                <div>
                  <div className="view-more">
                    <a
                      href="#"
                      className="text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowFeatures(!showFeatures);
                      }}
                    >
                      {showFeatures ? "Hide Details" : "View More Details"}
                    </a>
                  </div>

                  {showFeatures && (
                    <div className="product-details mt-3">
                      <h5>Product Features</h5>
                      {product?.featureSets?.length > 0 ? (
                        <Accordion defaultActiveKey="0" className="mb-3 custom-accordion">
                          {product.featureSets.map((set, idx) => (
                            <Accordion.Item eventKey={idx.toString()} key={set.setId}>
                              <Accordion.Header>{set.setTitle}</Accordion.Header>
                              <Accordion.Body>
                                <ul className="list-unstyled mb-0">
                                  {set.rows.map((r) => (
                                    <li key={r.listId} className="mb-1">
                                      <strong>{r.label}:</strong> {r.value ?? "-"}
                                    </li>
                                  ))}
                                </ul>
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      ) : (
                        <p className="text-muted">No features available</p>
                      )}
                    </div>
                  )}
                </div>
                <OtpLoginModal
                  show={showLogin}
                  onClose={() => {
                    setShowLogin(false);
                    setPostLoginAction(null);
                  }}
                  onLoginSuccess={async () => {
                    if (postLoginAction) {
                      await postLoginAction();
                    }
                    setShowLogin(false);
                    setPostLoginAction(null);
                  }}
                />
              </div>

            </div>
          </div>
        </div>
        <div className="container Fabric pb-4">
          <h3>Related Products</h3>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            <RelatedProducts products={product.relatedProducts} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
