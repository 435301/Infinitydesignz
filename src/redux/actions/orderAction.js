import axios from 'axios';
import BASE_URL from '../../config/config';
import { getToken } from '../../utils/auth';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';

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
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    throw error;
  }
};
