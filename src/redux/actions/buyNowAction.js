import axios from "axios";
import BASE_URL from "../../config/config";
import { getToken } from "../../utils/auth";
import { toast } from "react-toastify";

export const GET_BUY_NOW = "GET_BUY_NOW";
export const SET_BUY_NOW = 'SET_BUY_NOW';
export const UPDATE_BUY_NOW = 'UPDATE_BUY_NOW';
export const DELETE_BUY_NOW = 'DELETE_BUY_NOW';
export const APPLY_COUPON_BUY_NOW = 'APPLY_COUPON_BUY_NOW';
export const BUY_NOW_ERROR = 'BUY_NOW_ERROR';

export const PLACE_ORDER_BUYNOW_REQUEST = 'PLACE_ORDER_BUYNOW_REQUEST';
export const PLACE_ORDER_BUYNOW_SUCCESS = 'PLACE_ORDER_BUYNOW_SUCCESS';
export const PLACE_ORDER_BUYNOW_FAILURE = 'PLACE_ORDER_BUYNOW_FAILURE';


// Get Buy Now
export const getBuyNow = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/buy-now`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: GET_BUY_NOW, payload: res.data });
    } catch (error) {
        dispatch({ type: BUY_NOW_ERROR, payload: error.message });
    }
};

// Set Buy Now
export const setBuyNow = (buyNowData, navigate) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/buy-now`, buyNowData,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        dispatch({ type: SET_BUY_NOW, payload: res.data });
        navigate("/cart?buyNow=true");
    } catch (error) {
        dispatch({ type: BUY_NOW_ERROR, payload: error.message });
    }
};


// Update Buy Now
export const updateBuyNow = (id, updateData) => async (dispatch) => {
    try {
        const res = await axios.put(`${BASE_URL}/buy-now/${id}`, updateData,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        dispatch({ type: UPDATE_BUY_NOW, payload: res.data });
    } catch (error) {
        dispatch({ type: BUY_NOW_ERROR, payload: error.message });
    }
};

// Delete Buy Now
export const deleteBuyNow = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/buy-now/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: DELETE_BUY_NOW, payload: id });
    } catch (error) {
        dispatch({ type: BUY_NOW_ERROR, payload: error.message });
    }
};

// Apply Coupon for Buy Now
export const applyCouponBuyNow = (couponData) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/coupons/apply-buy-now`, couponData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: APPLY_COUPON_BUY_NOW, payload: res.data });
        console.log("applyCouponBuyNow API response", res.data);
    } catch (error) {
        dispatch({ type: BUY_NOW_ERROR, payload: error.message });
    }
};

export const placeBuyNowOrder = (orderData) => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_BUYNOW_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/orders/buy-now`, orderData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: PLACE_ORDER_BUYNOW_SUCCESS, payload: response.data });
    toast.success(response.data?.message || 'Order placed successfully');
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_BUYNOW_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    throw error;
  }
};
