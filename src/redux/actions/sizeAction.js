import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_SIZE_REQUEST = 'FETCH_SIZE_REQUEST';
export const FETCH_SIZE_SUCCESS = 'FETCH_SIZE_SUCCESS';
export const FETCH_SIZE_FAILURE = 'FETCH_SIZE_FAILURE';
export const ADD_SIZES_REQUEST ='ADD_SIZES_REQUEST';
export const ADD_SIZES_SUCCESS ='ADD_SIZES_SUCCESS';
export const ADD_SIZES_FAILURE ='ADD_SIZES_FAILURE';
export const EDIT_SIZES_REQUEST='EDIT_SIZES_REQUEST';
export const EDIT_SIZES_SUCCESS='EDIT_SIZES_SUCCESS';
export const EDIT_SIZES_FAILURE='EDIT_SIZES_FAILURE';



export const fetchSizes = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_SIZE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/size-uom`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response', response)
      dispatch({ type: FETCH_SIZE_SUCCESS, payload: response.data });
      //  toast.dismiss(loadingToastId);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch sizes');
      dispatch({
        type: FETCH_SIZE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addSizes = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_SIZES_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${BASE_URL}/size-uom`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_SIZES_SUCCESS' });
    dispatch(fetchSizes());
  } catch (error) {
    dispatch({
      type: 'ADD_SIZES_FAILURE',
      payload: error.response?.data?.message || 'Error adding size',
    });
    throw error; 
  }
};


export const editSizes = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_SIZES_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload; // extract id

    await axios.patch(`${BASE_URL}/size-uom/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_SIZES_SUCCESS' });
    dispatch(fetchSizes());
  } catch (error) {
    dispatch({
      type: 'EDIT_SIZES_FAILURE',
      payload: error.response?.data?.message || 'Error editing size',
    });
  }
};
