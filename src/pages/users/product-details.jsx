import React, { useState, useEffect } from "react";
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

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const variantIdFromURL = searchParams.get("variantId");
  const [thumbnails, setThumbnails] = useState([]);


  const { product = [] } = useSelector((state) => state.userProductDetails);
  const { productId } = useParams();
  // const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  console.log('mainImage', mainImage)
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    dispatch(fetchUserProductDetailsById(productId, variantIdFromURL));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      const variantId = parseInt(variantIdFromURL);
      const allVariantImages = product.images?.variantImages || [];
      const additional = product.images?.additional || [];

      setSelectedSizeId(product.selectedVariant?.sizeId || '');
      setSelectedColorId(product.selectedVariant?.colorId || '');

      let selectedImages = [];

      if (!isNaN(variantId)) {
        selectedImages = allVariantImages.filter(
          (img) => parseInt(img.variantId) === variantId
        );
      }

      if (selectedImages.length > 0) {
        const mainVariantImg = selectedImages.find((img) => img.isMain) || selectedImages[0];
        setMainImage(`${BASE_URL}/uploads/products/${mainVariantImg.url}`);
        setThumbnails([
          ...selectedImages.map((img) => ({ url: img.url })),
        ]);
      } else {
        // fallback to product-level images
        const mainImgUrl = product.images?.main?.url;
        if (mainImgUrl) {
          setMainImage(`${BASE_URL}/uploads/products/${mainImgUrl}`);
        }

        setThumbnails([
          { url: product.images?.main?.url, isMain: true },
          ...additional,
        ]);
      }
    }
  }, [product, variantIdFromURL]);



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
    console.log("Zoom background:", zoomResult.style.backgroundImage);

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
    };
  }, [mainImage]);

  const handleChat = () => alert("Chat selected!");
  const handleCart = () => alert("Added to Cart!");
  const handleBuy = () => alert("Buy Now clicked!");
  const handleWishlist = () => alert("Added to Wishlist!");
  const handlePincodeCheck = () => {
    if (pincode) alert(`Checking delivery for PIN code: ${pincode}`);
    else alert("Please enter a PIN code");
  };

  if (!product) return <div className="container my-5">Loading...</div>;

  const { title, brand, description, mrp, sellingPrice, stock, size, productDetails, variants, selectedVariant } = product;

  const additionalImages = product.images?.additional || [];
  // const thumbnails = [
  //   { url: product.images?.main?.url, isMain: true },
  //   ...additionalImages
  // ];

  return (
    <>
      <Header />
      <section className="product-details-page">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex gap-2">
                <div className="thumb-gallery d-flex flex-column me-2" style={{ marginTop: "200px" }}>
                  {thumbnails.map((img, index) => (
                    <div
                      key={index}
                      className="thumb-item mb-2"
                      onClick={() => setMainImage(`${BASE_URL}/uploads/products/${img.url}`)}
                      style={{
                        cursor: "pointer",
                        border: mainImage.includes(img.url) ? "2px solid #007bff" : "1px solid #ddd",
                        borderRadius: 4
                      }}
                    >
                      <img
                        src={`${BASE_URL}/uploads/products/${img.url}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="img-fluid"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
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
                    className="img-fluid product-image"
                    id="mainImage"
                    loading="lazy"
                  />
                  <div className="zoom-result" id="zoomResult" style={{ display: "none" }}></div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h2 className="product-title">
                {title} <span className="stock-status">{stock} left</span>
              </h2>

              <div className="price-details">
                <div>
                  <span className="price-value">₹{selectedVariant?.sellingPrice}</span>
                  <span className="discount-label">
                    Flat{" "}
                    {selectedVariant?.mrp && selectedVariant?.sellingPrice
                      ? Math.round(((selectedVariant.mrp - selectedVariant.sellingPrice) / selectedVariant.mrp) * 100)
                      : 0}
                    % off
                  </span>
                </div>
                <span className="original-price">MRP: ₹{selectedVariant?.mrp}</span>
                <p className="tax-info">Inclusive of all taxes</p>
              </div>

              <div className="dropdown-container mb-3">
                <label className="dropdown-label">Select Size</label>
                <select
                  className="form-select1 size-dropdown"
                  value={selectedSizeId}
                  onChange={(e) => {
                    const newSizeId = parseInt(e.target.value);
                    setSelectedSizeId(newSizeId);

                    const matchedVariant = variants.find(
                      (v) =>
                        parseInt(v.size?.id) === newSizeId &&
                        (!selectedColorId || v.color?.id === parseInt(selectedColorId))
                    );

                    if (matchedVariant) {
                      alert("Size matched");
                      window.open(`/product-details/${matchedVariant.productId}`, '_blank');
                    } else {
                      alert("No matching variant found for selected size");
                    }
                  }}
                >
                  <option value="">Select</option>
                  {[...new Map(variants.map(v => [v.size?.id, v.size])).values()]
                    .filter(Boolean)
                    .map(size => (
                      <option key={size.id} value={size.id}>
                        {size.title}
                      </option>
                    ))}
                </select>

                <label className="dropdown-label mt-2">Select Color</label>
                <select
                  className="form-select1 color-dropdown"
                  value={selectedColorId}
                  onChange={(e) => {
                    const newColorId = parseInt(e.target.value);
                    setSelectedColorId(newColorId);

                    const matchedVariant = variants.find(
                      (v) =>
                        parseInt(v.color?.id) === newColorId &&
                        (!selectedSizeId || v.size?.id === parseInt(selectedSizeId))
                    );

                    if (matchedVariant) {
                      alert("Color matched");
                      window.open(`/product-details/${matchedVariant.productId}`, '_blank');
                    } else {
                      alert("No matching variant found for selected color");
                    }
                  }}
                >
                  <option value="">Select</option>
                  {[...new Map(variants.map(v => [v.color?.id, v.color])).values()]
                    .filter(color => color?.id)
                    .map(color => (
                      <option key={color.id} value={color.id}>
                        {color.label || "N/A"}
                      </option>
                    ))}
                </select>
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
                  <button className="check-btn" onClick={handlePincodeCheck}>
                    Check
                  </button>
                </div>
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
                <div className="multi-column">
                  <div><h6>Description</h6><p dangerouslySetInnerHTML={{ __html: description }} /></div>
                  <div><h6>Size</h6><p>{product.size?.title}</p></div>
                  <div><h6>Color</h6><p>{product.color?.title || "N/A"}</p></div>
                  <div>
                    <h6>Dimensions (in inches)</h6><p>{product.height ? `H ${product.height}` : 'H N/A'} ×{' '} {product.width ? `W ${product.width}` : 'W N/A'} ×{' '}{product.length ? `L ${product.length}` : 'L N/A'}</p>
                  </div>
                  <div><h6>SKU</h6><p>{product.sku}</p></div>
                  <div><h6>Weight</h6><p>{productDetails?.weight} gms</p></div>
                  <div><h6>Stock</h6><p>{product?.stock}</p></div>
                  <div><h6>Delivery Charges</h6><p>₹{productDetails?.deliveryCharges}</p></div>
                  <div><h6>SLA</h6><p>{productDetails?.sla} Days</p></div>
                </div>
                <div className="view-more">
                  <a href="#">View More Details</a>
                </div>
              </div>
              <div className="container Fabric pb-4">
                <h3>Related Products</h3>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {product.relatedProducts && product.relatedProducts.length > 0 ? (
                    product.relatedProducts.map((item) => {
                      const mainImage = item.images?.find((img) => img.isMain && img.variantId === null) || item.images?.[0];
                      const imageUrl = mainImage ? `${BASE_URL}/uploads/products/${mainImage.url}` : '';

                      const hasDiscount =
                        item.mrp && item.sellingPrice && item.mrp > item.sellingPrice;

                      const discountPercent = hasDiscount
                        ? Math.round(((item.mrp - item.sellingPrice) / item.mrp) * 100)
                        : 0;

                      return (
                        <div className="col-lg-3 p-2" key={item.id}>
                          <div className="card h-100 position-relative">
                            {hasDiscount && (
                              <div className="discount-badge position-absolute top-0 start-0 bg-danger text-white px-2 pt-1 mt-3 rounded">
                                {discountPercent}% OFF
                              </div>
                            )}
                            {/* <div className="wishlist-icon position-absolute top-0 end-0 p-2">
                <img src={Icon} alt="Wishlist" />
              </div> */}
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                className="card-img-top"
                                alt={item.title}
                                style={{ height: '220px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div
                                className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
                                style={{ height: '220px' }}
                              >
                                No Image
                              </div>
                            )}
                            <div className="card-body">
                              <h6 className="card-title">{item.title}</h6>
                              <p className="card-text">
                                <strong>₹{item.sellingPrice}</strong>{' '}
                                {hasDiscount && <del>MRP ₹{item.mrp}</del>}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No related products found.</p>
                  )}
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
