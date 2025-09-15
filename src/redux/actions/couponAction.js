import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_COUPON_REQUEST = 'FETCH_COUPON_REQUEST';
export const FETCH_COUPON_SUCCESS = 'FETCH_COUPON_SUCCESS';
export const FETCH_COUPON_FAILURE = 'FETCH_COUPON_FAILURE';
export const ADD_COUPON_REQUEST = 'ADD_COUPON_REQUEST';
export const ADD_COUPON_SUCCESS = 'ADD_COUPON_SUCCESS';
export const ADD_COUPON_FAILURE = 'ADD_COUPON_FAILURE';
export const EDIT_COUPON_REQUEST = 'EDIT_COUPON_REQUEST';
export const EDIT_COUPON_SUCCESS = 'EDIT_COUPON_SUCCESS';
export const EDIT_COUPON_FAILURE = 'EDIT_COUPON_FAILURE'
export const DELETE_COUPON_SUCCESS = 'DELETE_COUPON_SUCCESS';
export const BULK_UPDATE_COUPON_SUCCESS = 'BULK_UPDATE_COUPON_SUCCESS';

export const fetchCoupon = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_COUPON_REQUEST });

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/coupons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_COUPON_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch coupons');
      dispatch({
        type: FETCH_COUPON_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const fetchCouponById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/coupons/${id}`);
    dispatch({ type: "FETCH_COUPON_BY_ID_SUCCESS", payload: res.data });
    return res.data
  } catch (err) {
    dispatch({ type: "FETCH_COUPON_BY_ID_FAILURE", payload: err });
    throw err;
  }
};


export const addCoupon = (payload) => async (dispatch) => {
  dispatch({ type: 'ADD_COUPON_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${BASE_URL}/coupons`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'ADD_COUPON_SUCCESS' });
    toast.success('coupon created successfully')
    dispatch(fetchCoupon());
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding coupons');
    dispatch({
      type: 'ADD_COUPON_FAILURE',
      // payload: error.response?.data?.message || 'Error adding coupons',
    });
    throw error;
  }
};

export const editCoupon = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_COUPON_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload;
    await axios.put(`${BASE_URL}/coupons/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_COUPON_SUCCESS' });
    toast.success('Coupons updated successfully')
    dispatch(fetchCoupon());
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error editing colors');
    dispatch({
      type: 'EDIT_COUPON_FAILURE',
      payload: error.response?.data?.message || 'Error editing coupons',
    });
    throw error;
  }
};

export const deleteCoupon = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/coupons/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchCoupon(id));
    toast.success('Coupons deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete coupons.');
    console.error(error);
  }
};

export const bulkUpdateCouponStatus = (ids,status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'coupons', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchCoupon()); 
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update coupon status.');
  }
};