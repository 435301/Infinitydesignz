import axios from 'axios';
import BASE_URL from '../../config/config';
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';

export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

export const FETCH_ADMINORDERS_REQUEST = 'FETCH_ADMINORDERS_REQUEST';
export const FETCH_ADMINORDERS_SUCCESS = 'FETCH_ADMINORDERS_SUCCESS';
export const FETCH_ADMINORDERS_FAILURE = 'FETCH_ADMINORDERS_FAILURE';

export const FETCH_ORDER_BY_ID_REQUEST = 'FETCH_ORDER_BY_ID_REQUEST';
export const FETCH_ORDER_BY_ID_SUCCESS = 'FETCH_ORDER_BY_ID_SUCCESS';
export const FETCH_ORDER_BY_ID_FAILURE = 'FETCH_ORDER_BY_ID_FAILURE';

export const placeOrder = (orderData) => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/orders/place`, orderData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data });
    toast.success(response.data?.message || 'Order placed successfully');
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const fetchOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const response = await axios.get(`${BASE_URL}/orders/user`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const fetchAdminOrders = (filters = {}) => async (dispatch) => {
  dispatch({ type: FETCH_ADMINORDERS_REQUEST });
  try {
     const token = localStorage.getItem('token');
    
     const response = await axios.get(`${BASE_URL}/orders`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...filters,
      },
    } );
    dispatch({
      type: FETCH_ADMINORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ADMINORDERS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchOrderById = (orderId) => async (dispatch) => {
  try {
     const token = localStorage.getItem('token');
    dispatch({ type: FETCH_ORDER_BY_ID_REQUEST });

    const response = await axios.get(`${BASE_URL}/orders/${orderId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: FETCH_ORDER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
