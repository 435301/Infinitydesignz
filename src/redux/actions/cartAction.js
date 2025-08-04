import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";

export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const UPDATE_CART_SUCCESS = "UPDATE_CART_SUCCESS";
export const DELETE_FROM_CART_SUCCESS = "DELETE_FROM_CART_SUCCESS";

export const CLEAR_GUEST_CART='CLEAR_GUEST_CART'

const getToken = () => localStorage.getItem('access_token');

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

export const addToCart = (cartItem) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/cart`, cartItem, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
        dispatch(fetchCart());
        toast.success(response?.message || 'Added to cart successfully');
    } catch (error) {
        console.error('Add to cart failed:', error);
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

export const DeleteToCart = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: id });
        dispatch(fetchCart());
        toast.success(response?.message || 'Removed from Cart successfully');
    } catch (error) {
        console.error("Delete from cart failed:", error)
    }
};

export const syncGuestCartToUserCart = () => async (dispatch, getState) => {
  const { guestCart: { items } } = getState();

  if (!items || items.length === 0) return;

  try {
    const token = getToken();

    for (const item of items) {
      await axios.post(
        `${BASE_URL}/cart`,
        {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    dispatch({type:CLEAR_GUEST_CART});
    dispatch(fetchCart()); // refresh user cart from backend
  } catch (error) {
    console.error("Failed to sync guest cart:", error);
  }
};