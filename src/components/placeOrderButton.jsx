import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { placeOrder } from '../redux/actions/orderAction';
import { placeBuyNowOrder } from '../redux/actions/buyNowAction';
import { clearCart } from '../redux/actions/cartAction';

const PlaceOrderButton = ({
  mode = "cart", // "cart" or "buyNow"
  disabled = false,
  selectedAddressId,
  paymentMethod = "COD",
  cartItems = [],
  buyNowProduct = null,
  priceSummary = {},
  appliedCoupon = null
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select appropriate loading/error slice
  const { loading, error } = useSelector((state) => state.order);

  // Build Cart payload
  const buildCartOrderData = () => {
    const items = cartItems.map(item => {
      const productData = item.variant || item.product;
      return {
        productId: item.productId,
        variantId: item.variantId || null,
        quantity: item.quantity,
        price: productData.price,
        total: productData.price * item.quantity,
      };
    });

    return {
      addressId: selectedAddressId,
      paymentMethod: paymentMethod.toUpperCase(),
      note: "Leave at door",
      subtotal: priceSummary.totalAfterDiscount || 0,
      shippingFee: priceSummary.shippingFee || 0,
      gst: priceSummary.gst || 0,
      totalAmount: priceSummary.finalPayable || 0,
      items,
    };
  };

  // Build Buy Now payload
  const buildBuyNowOrderData = () => ({
    productId: buyNowProduct.productId,
    variantId: buyNowProduct.variantId || null,
    quantity: buyNowProduct.quantity,
    addressId: selectedAddressId,
    note: "Leave at door",
    couponDiscount: appliedCoupon?.discount || 0,
    couponId: appliedCoupon?.id || null,
    shippingFee: priceSummary.shippingFee || 0,
  });

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.warning("Please select or add a delivery address before placing the order.");
      return;
    }
    let orderData;
    if (mode === "buyNow") {
      if (!buyNowProduct) {
        toast.error("No Buy Now product selected");
        return;
      }
      orderData = buildBuyNowOrderData();
    } else {
      if (!cartItems.length) {
        toast.error("Cart is empty. Cannot place order");
        return;
      }
      orderData = buildCartOrderData();
    }
    try {
      let result;
      if (mode === "buyNow") {
        result = await dispatch(placeBuyNowOrder(orderData));
      } else {
        result = await dispatch(placeOrder(orderData));
      }

      if (result && !result.error) {
        // Clear the cart only for "cart" mode after successful order
        if (mode === "cart") {
          await dispatch(clearCart());
        }
        navigate(`/orders-success/${result.payload.id}`);
      } else {
        navigate("/orders-failure");
      }
      console.log("result", result);
    } catch (e) {
      toast.error("Failed to place order");
      navigate("/orders-failure");
    }
  };

  return (
    <>
      <button
        className="main-action w-100 mt-3"
        onClick={handlePlaceOrder}
        disabled={disabled || loading}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </>
  );
};

export default PlaceOrderButton;
