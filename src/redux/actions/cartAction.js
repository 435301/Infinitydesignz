import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";
import { getToken, isLoggedIn } from "../../utils/auth";
import { addToGuestCart } from "./guestCartAction";

export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const UPDATE_CART_SUCCESS = "UPDATE_CART_SUCCESS";
export const DELETE_FROM_CART_SUCCESS = "DELETE_FROM_CART_SUCCESS";
export const APPLY_COUPON_SUCCESS = "APPLY_COUPON_SUCCESS";
export const REMOVE_COUPON = 'REMOVE_COUPON';
export const CLEAR_GUEST_CART = 'CLEAR_GUEST_CART';
export const SET_GUEST_CART = "SET_GUEST_CART";
export const CLEAR_CART_REQUEST = "CLEAR_CART_REQUEST";
export const CLEAR_CART_SUCCESS = "CLEAR_CART_SUCCESS";
export const CLEAR_CART_FAILURE = "CLEAR_CART_FAILURE";
export const CLEAR_NOW = "CLEAR_NOW";


export const fetchCart = () => async (dispatch) => {
    dispatch({ type: FETCH_CART_REQUEST });
    try {
        const response = await axios.get(`${BASE_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: FETCH_CART_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
    }
};

// export const addToCart = (cartItem) => async (dispatch) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/cart`, cartItem, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${getToken()}`,
//             },
//         });
//         dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
//         dispatch(fetchCart());
//         toast.success(response?.message || 'Added to cart successfully');
//     } catch (error) {
//         console.error('Add to cart failed:', error);
//     }

// };

export const addToCart = (cartItem) => async (dispatch) => {
  if (isLoggedIn()) {
    try {
      const response = await axios.post(
        `${BASE_URL}/cart`,
        cartItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
      dispatch(fetchCart());
      toast.success(response?.data?.message || "Added to cart successfully");
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add to cart");
    }
  } else {
    dispatch(addToGuestCart(cartItem));
  }
};

export const UpdateToCart = (id, updatedItem) => async (dispatch) => {
    try {
        const response = await axios.patch(`${BASE_URL}/cart/${id}`, updatedItem, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: UPDATE_CART_SUCCESS, payload: response.data });
        dispatch(fetchCart());
        toast.success(response?.message || 'Updated to cart successfully');
    } catch (error) {
        console.error("Update cart failed:", error)
    }
};

export const DeleteFromCart = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: id });
        dispatch(fetchCart());
        toast.success(response?.data?.message || 'Removed from Cart successfully');
    } catch (error) {
        console.error("Delete from cart failed:", error)
    }
};

export const syncGuestCartToUserCart = () => async (dispatch, getState) => {
  const { guestCart: { items } } = getState();

  if (!items || items.length === 0) return;

  try {
    const token = getToken();
    const response = await axios.post(
      `${BASE_URL}/cart/sync`,
      { items },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Update user cart with synced data
    dispatch({ type: FETCH_CART_SUCCESS, payload: response.data.data });
    dispatch({ type: CLEAR_GUEST_CART });
    toast.success(response.data.message || "Guest cart synced successfully");
  } catch (error) {
    console.error("Failed to sync guest cart:", error);
    toast.error("Failed to sync guest cart");
  }
};

export const applyCoupon = (couponCode) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/coupons/apply`,
            {
                code: couponCode,
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
            }
        );
        dispatch({
            type: APPLY_COUPON_SUCCESS,
            payload: {
                priceSummary: response.data.priceSummary,
                coupon: response.data.coupon,
            },
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
        throw new Error(error.response?.data?.message || "Invalid coupon code");
    }
};

export const removeCoupon = () => ({
    type: REMOVE_COUPON,
});

export const setGuestCart = (items) => {
  return {
    type: SET_GUEST_CART,
    payload: items,
  };
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });
  try {
    const response = await axios.delete(`${BASE_URL}/cart/clear`,{
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch({
      type: CLEAR_CART_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAILURE,
      payload: error.message || "Failed to clear cart",
    });
    throw error;
  }
};


export const clearCouponCart = (code) => async (dispatch) => {
    dispatch({ type: CLEAR_NOW });
    try {
        const response = await axios.post(`${BASE_URL}/coupons/clear-buy-now`, code, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: CLEAR_NOW, payload: response.data });
        return { payload: response.data };
    } catch (error) {
       
        throw error;
    }
};