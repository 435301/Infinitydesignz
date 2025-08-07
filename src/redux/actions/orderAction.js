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
    const response = await axios.get(`${BASE_URL}/orders`, {
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

