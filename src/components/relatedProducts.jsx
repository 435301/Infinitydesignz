import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../config/config";
import { getToken, isLoggedIn } from "../utils/auth";
import { addToWishlist, deleteWishlistItem } from "../redux/actions/whishlistAction";
import OtpLoginModal from "./otpLoginModal";

export default function RelatedProducts({ products = [] }) {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [wishlistState, setWishlistState] = useState({}); // productId: { isWishlisted, wishlistItemId }

  // Fetch wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/wishlist`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const wishlist = res.data || [];

        const updated = {};
        wishlist.forEach((item) => {
          updated[item.productId] = {
            isWishlisted: true,
            wishlistItemId: item.id,
          };
        });

        setWishlistState(updated);
      } catch (err) {
        console.error("Error loading wishlist", err);
      }
    };

    if (isLoggedIn()) {
      fetchWishlist();
    }
  }, [products]);

  const handleWishlistClick = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      setShowLogin(true);
      return;
    }

    const current = wishlistState[productId] || {};
    if (current.isWishlisted) {
      try {
        await dispatch(deleteWishlistItem(current.wishlistItemId));
        setWishlistState((prev) => ({
          ...prev,
          [productId]: { isWishlisted: false, wishlistItemId: null },
        }));
      } catch (err) {
        console.error("Failed to remove from wishlist", err);
      }
    } else {
      try {
        const res = await dispatch(addToWishlist(productId, null));
        const wishlistItemId = res?.payload?.id;
        setWishlistState((prev) => ({
          ...prev,
          [productId]: { isWishlisted: true, wishlistItemId },
        }));
      } catch (err) {
        console.error("Failed to add to wishlist", err);
      }
    }
  };

  if (!products.length) return <p>No related products found.</p>;

  return (
    <>
      {products.map((item) => {
        const mainImage =
          item.images?.find((img) => img.isMain && img.variantId === null) || item.images?.[0];
        const imageUrl = mainImage ? `${BASE_URL}/uploads/products/${mainImage.url}` : "";
        const hasDiscount = item.mrp && item.sellingPrice && item.mrp > item.sellingPrice;
        const discountPercent = hasDiscount
          ? Math.round(((item.mrp - item.sellingPrice) / item.mrp) * 100)
          : 0;

        const isWishlisted = wishlistState[item.id]?.isWishlisted;

        return (
          <div className="col-lg-3 p-2" key={item.id}>
            <a
              href={`/product-details/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 position-relative">
                {hasDiscount && (
                  <div className="discount-badge position-absolute top-0 start-0 bg-danger text-white px-2 pt-1 mt-3 rounded">
                    {discountPercent}% OFF
                  </div>
                )}

                <div className="position-absolute top-0 end-0 p-2" style={{ zIndex: 2 }}>
                  <div className="whishlist_Icon" onClick={(e) => handleWishlistClick(e, item.id)}>
                    {isWishlisted ? (
                      <FaHeart className="text-danger" style={{ fontSize: "1.1rem", cursor: "pointer" }} />
                    ) : (
                      <FaRegHeart className="text-black" style={{ fontSize: "1.1rem", cursor: "pointer" }} />
                    )}
                  </div>
                </div>

                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted"
                    style={{ height: "220px" }}
                  >
                    No Image
                  </div>
                )}

                <div className="card-body">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text">
                    <strong>₹{item.sellingPrice}</strong>{" "}
                    {hasDiscount && <del>MRP ₹{item.mrp}</del>}
                  </p>
                </div>
              </div>
            </a>
          </div>
        );
      })}

      <OtpLoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => {
          // Optionally refetch wishlist here if needed
          window.location.reload();
        }}
      />
    </>
  );
}
