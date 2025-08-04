
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../config/config";
import { getToken, isLoggedIn } from "../utils/auth";
import "../../src/css/user/userstyle.css";
import { addToWishlist, deleteWishlistItem } from "../redux/actions/whishlistAction";
import OtpLoginModal from "./otpLoginModal";
import React, { useEffect, useState, useCallback, useMemo } from "react";

const ProductCard = ({ product, variant = null }) => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState(null);

  const {
    id,
    title = "No Title",
    images = [],
    mrp,
    sellingPrice,
    variants = [],
  } = product || {};

  // Memoize price, image, and discount calculations
  const { displayMrp, displayPrice, mainImageObj, hasImage, imageUrl, discountPercent } = useMemo(() => {
    let _displayMrp = mrp;
    let _displayPrice = sellingPrice;
    let _mainImageObj = null;

    if (variant) {
      const variantId = variant.id;
      _displayMrp = variant.mrp;
      _displayPrice = variant.sellingPrice;
      _mainImageObj =
        images.find((img) => img.variantId === variantId && img.isMain) ||
        images.find((img) => img.variantId === variantId);
    } else {
      _mainImageObj =
        images.find((img) => img.variantId === null && img.isMain) ||
        images.find((img) => img.variantId === null);

      if ((!_displayMrp || !_displayPrice) && variants.length > 0) {
        _displayMrp = variants[0].mrp || 0;
        _displayPrice = variants[0].sellingPrice || 0;
      }
    }

    const _hasImage = !!_mainImageObj?.url;
    const _imageUrl = _hasImage
      ? `${BASE_URL}/uploads/products/${_mainImageObj.url}`
      : "";

    const _discountPercent =
      _displayMrp > _displayPrice && _displayMrp !== 0
        ? Math.round(((_displayMrp - _displayPrice) / _displayMrp) * 100)
        : 0;

    return {
      displayMrp: _displayMrp,
      displayPrice: _displayPrice,
      mainImageObj: _mainImageObj,
      hasImage: _hasImage,
      imageUrl: _imageUrl,
      discountPercent: _discountPercent,
    };
  }, [mrp, sellingPrice, images, variants, variant]);

  // Memoize wishlist handler
  const handleWishlistClick = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isLoggedIn()) {
        setShowLogin(true);
        return;
      }

      if (isWishlisted) {
        try {
          await dispatch(deleteWishlistItem(wishlistItemId));
          setIsWishlisted(false);
        } catch (err) {
          console.error("Failed to remove from wishlist", err);
        }
      } else {
        try {
          const res = await dispatch(addToWishlist(product?.id, variant?.id ?? null));
          setIsWishlisted(true);
          if (res?.payload?.id) setWishlistItemId(res.payload.id);
        } catch (err) {
          console.error("Failed to add to wishlist", err);
        }
      }
    },
    [dispatch, isWishlisted, wishlistItemId, product?.id, variant?.id]
  );

  // Fetch wishlist only when logged in and product/variant changes
  useEffect(() => {
    let isMounted = true;
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/wishlist`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const wishlist = res.data || [];

        const match = wishlist.find((item) => {
          if (variant?.id) {
            return item.productId === product.id && item.variantId === variant.id;
          } else {
            return item.productId === product.id && !item.variantId;
          }
        });

        if (isMounted && match) {
          setIsWishlisted(true);
          setWishlistItemId(match.id);
        }
        if (isMounted && !match) {
          setIsWishlisted(false);
          setWishlistItemId(null);
        }
      } catch (err) {
        if (isMounted) {
          setIsWishlisted(false);
          setWishlistItemId(null);
        }
        console.error("Error checking wishlist", err);
      }
    };

    if (isLoggedIn()) {
      fetchWishlist();
    } else {
      setIsWishlisted(false);
      setWishlistItemId(null);
    }
    return () => {
      isMounted = false;
    };
  }, [product.id, variant?.id]);

  return (
    <>
      <div className="col-lg-4 col-6 p-2">
        <Link
          to={
            variant
              ? `/product-details/${id}?variantId=${variant.id}`
              : `/product-details/${id}`
          }
          className="text_decoration"
        >
          <div className="card h-100 position-relative">
            {/* Discount badge */}
            {discountPercent > 0 && (
              <div className="discount-badge position-absolute">
                {discountPercent}% OFF
              </div>
            )}

            {/* Wishlist icon */}
            <div
              className="position-absolute top-0 end-0 p-2"
              style={{ zIndex: 2 }}
            >
              <div className="whishlist_Icon" onClick={handleWishlistClick}>
                {isWishlisted ? (
                  <FaHeart
                    className="text-danger"
                    style={{ fontSize: "1.1rem", cursor: "pointer" }}
                    title="Remove from Wishlist"
                  />
                ) : (
                  <FaRegHeart
                    className="text-black"
                    style={{ fontSize: "1.1rem", cursor: "pointer" }}
                    title="Add to Wishlist"
                  />
                )}
              </div>
            </div>

            {/* Product image */}
            {hasImage ? (
              <img src={imageUrl} className="card-img-top" alt={title} />
            ) : (
              <div
                className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
                style={{ height: "200px", fontSize: "1.2rem" }}
              >
                N/A
              </div>
            )}

            {/* Product info */}
            <div className="card-body">
              <h6 className="card-title">{title}</h6>
              <p className="card-text">
                <strong>₹{displayPrice}</strong>{" "}
                {displayMrp > displayPrice ? (
                  <del>MRP ₹{displayMrp}</del>
                ) : (
                  <span className="text-muted ms-2">(No discount)</span>
                )}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* OTP Login Modal */}
      <OtpLoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={async () => {
          const res = await dispatch(addToWishlist(id, variant?.id ?? null));
          if (res?.payload?.id) {
            setIsWishlisted(true);
            setWishlistItemId(res.payload.id);
          }
        }}
      />
    </>
  );
};

export default ProductCard;
