import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../config/config";
import { getToken, isLoggedIn } from "../utils/auth";
import { addToWishlist, deleteWishlistItem } from "../redux/actions/whishlistAction";
import OtpLoginModal from "./otpLoginModal";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./productcard.css";

const ProductCard = ({ product, variant = null, className = '', size = "medium" }) => {
  const sizeClasses = {
    small: "col-lg-3 col-4 p-1 m-1",
    medium: "col-lg-4 col-6 p-2",
    large: "col-lg-3 col-6 p-3",
  };
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const { items: wishlistItems } = useSelector((state) => state.whishlist);
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState(null);

  const {
    id,
    title = "No Title",
    images = { main: null, additional: [], variants: {} },
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
      const variantImages = images.variants[variantId];
      _displayMrp = variant.mrp;
      _displayPrice = variant.sellingPrice;
      _mainImageObj = variantImages?.main || (variantImages?.additional || []).find(img => img.isMain);
    } else {
      _mainImageObj = images.main || (images.additional || []).find(img => img.isMain);

      if ((!_displayMrp || !_displayPrice) && variants.length > 0) {
        _displayMrp = variants[0].mrp || 0;
        _displayPrice = variants[0].sellingPrice || 0;
      }
    }

    const _hasImage = !!_mainImageObj?.url;
    const _imageUrl = _hasImage
      ? `${BASE_URL}/Uploads/products/${_mainImageObj.url}`
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

  const isWishlisted = useMemo(() => {
    return wishlistItems.some((item) =>
      variant?.id
        ? item.productId === product.id && item.variantId === variant.id
        : item.productId === product.id && !item.variantId
    );
  }, [wishlistItems, product.id, variant?.id]);

  const currentWishlistItem = useMemo(() => {
  return wishlistItems.find((item) =>
    variant?.id
      ? item.productId === product.id && item.variantId === variant.id
      : item.productId === product.id && !item.variantId
  );
}, [wishlistItems, product.id, variant?.id]);

const handleWishlistClick = useCallback(
  async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      setShowLogin(true);
      return;
    }

    if (isWishlisted && currentWishlistItem?.id) {
      await dispatch(deleteWishlistItem(currentWishlistItem.id));
    } else {
 await dispatch(addToWishlist(product.id, variant?.id ?? null));
    }
  },
  [dispatch, isWishlisted, wishlistItemId, product?.id, variant?.id]
);


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
          // setIsWishlisted(true);
          setWishlistItemId(match.id);
        }
        if (isMounted && !match) {
          // setIsWishlisted(false);
          setWishlistItemId(null);
        }
      } catch (err) {
        if (isMounted) {
          // setIsWishlisted(false);
          setWishlistItemId(null);
        }
        console.error("Error checking wishlist", err);
      }
    };

    if (isLoggedIn()) {
      fetchWishlist();
    } else {
      // setIsWishlisted(false);
      setWishlistItemId(null);
    }
    return () => {
      isMounted = false;
    };
  }, [product.id, variant?.id]);

  return (
    <>
      <div className={sizeClasses[size]}>
        <Link
          to={
            variant
              ? `/product-details/${id}?variantId=${variant.id}`
              : `/product-details/${id}`
          }
          className="text_decoration"
        >
          <div className="card h-100 position-relative">
            {discountPercent > 0 && (
              <div className="discount-badge position-absolute">
                {discountPercent}% OFF
              </div>
            )}

            <div className="wishlist-container border-0">
              <div className="" onClick={handleWishlistClick}>
                {isWishlisted ? (
                  <FaHeart
                    className="text-danger wishlist-icon"
                    title="Remove from Wishlist"
                  />
                ) : (
                  <FaRegHeart
                    className="text-black wishlist-icon"
                    title="Add to Wishlist"
                  />
                )}
              </div>
            </div>

            {hasImage ? (
              <img src={imageUrl} className="card-img-top" alt={title} />
            ) : (
              <div
                className="card-img-top no-image-placeholder"
              >
                N/A
              </div>
            )}

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
      <OtpLoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={async () => {
          const res = await dispatch(addToWishlist(id, variant?.id ?? null));
          if (res?.payload?.id) {
            // setIsWishlisted(true);
            setWishlistItemId(res.payload.id);
          }
        }}
      />
    </>
  );
};

export default ProductCard;