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

export const CLEAR_NOW = "CLEAR_NOW";
export const CLEAR_BUY_NOW = 'CLEAR_BUY_NOW';

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
        toast.success("Buy Now item added successfully");
        navigate("/cart?buyNow=true");

    } catch (error) {
        dispatch({ type: BUY_NOW_ERROR, payload: error.message });
    }
};


// Update Buy Now
export const updateBuyNow = (updateData) => async (dispatch) => {
    try {
        const res = await axios.patch(`${BASE_URL}/buy-now`, updateData,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        dispatch({ type: UPDATE_BUY_NOW, payload: res.data.data });
        toast.success("Buy Now item updated successfully");
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
        toast.success("Buy Now item deleted successfully");
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
        toast.success(res.data?.message || 'Coupon applied successfully');
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to apply coupon');
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
        return { payload: response.data };
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_BUYNOW_FAILURE,
            payload: error?.response?.data?.message || error.message,
        });
        throw error;
    }
};


export const clearBuyNow = () => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/buy-now`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        dispatch({ type: CLEAR_BUY_NOW });
        toast.success(response.data?.message || 'Buy Now cleared successfully');
        dispatch(getBuyNow());
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};


export const clearCoupon = (code) => async (dispatch) => {
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