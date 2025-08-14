import axios from "axios";
import BASE_URL from "../../config/config";
import { getToken } from "../../utils/auth";

export const GET_BUY_NOW = "GET_BUY_NOW";
export const SET_BUY_NOW = 'SET_BUY_NOW';
export const UPDATE_BUY_NOW = 'UPDATE_BUY_NOW';
export const DELETE_BUY_NOW = 'DELETE_BUY_NOW';
export const APPLY_COUPON_BUY_NOW = 'APPLY_COUPON_BUY_NOW';
export const BUY_NOW_ERROR = 'BUY_NOW_ERROR';


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
    } catch (error) {
        dispatch({ type: BUY_NOW_ERROR, payload: error.message });
    }
};
