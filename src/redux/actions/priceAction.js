import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_PRICE_REQUEST = 'FETCH_PRICE_REQUEST';
export const FETCH_PRICE_SUCCESS = 'FETCH_PRICE_SUCCESS';
export const FETCH_PRICE_FAILURE = 'FETCH_PRICE_FAILURE';
export const ADD_PRICE_REQUEST = 'ADD_PRICE_REQUEST';
export const ADD_PRICE_SUCCESS = 'ADD_PRICE_SUCCESS';
export const ADD_PRICE_FAILURE = 'ADD_PRICE_FAILURE';
export const EDIT_PRICE_REQUEST = 'EDIT_PRICE_REQUEST';
export const EDIT_PRICE_SUCCESS = 'EDIT_PRICE_SUCCESS';
export const EDIT_PRICE_FAILURE = 'EDIT_PRICE_FAILURE'
export const DELETE_PRICE_SUCCESS = 'DELETE_PRICE_SUCCESS';


export const fetchPrice = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_PRICE_REQUEST });

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/price-ranges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_PRICE_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch prices');
      dispatch({
        type: FETCH_PRICE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addPrice = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_PRICE_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${BASE_URL}/price-ranges`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'ADD_PRICE_SUCCESS' });
    toast.success('Price Range created successfully')
    dispatch(fetchPrice());
  } catch (error) {
    dispatch({
      type: 'ADD_PRICE_FAILURE',
      payload: error.response?.data?.message || 'Error adding prices',
    });
    throw error;
  }
};

export const editPrice = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_PRICE_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload;
    await axios.patch(`${BASE_URL}/price-ranges/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_PRICE_SUCCESS' });
    toast.success('Price Range updated successfully')
    dispatch(fetchPrice());
  } catch (error) {
    dispatch({
      type: 'EDIT_PRICE_FAILURE',
      payload: error.response?.data?.message || 'Error editing prices',
    });
    throw error;
  }
};

export const deletePrice = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/price-ranges/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchPrice(id));
    toast.success('Price Range deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete prices.');
    console.error(error);
  }
};

