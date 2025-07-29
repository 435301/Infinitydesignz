import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_SIZE_REQUEST = 'FETCH_SIZE_REQUEST';
export const FETCH_SIZE_SUCCESS = 'FETCH_SIZE_SUCCESS';
export const FETCH_SIZE_FAILURE = 'FETCH_SIZE_FAILURE';
export const ADD_SIZES_REQUEST = 'ADD_SIZES_REQUEST';
export const ADD_SIZES_SUCCESS = 'ADD_SIZES_SUCCESS';
export const ADD_SIZES_FAILURE = 'ADD_SIZES_FAILURE';
export const EDIT_SIZES_REQUEST = 'EDIT_SIZES_REQUEST';
export const EDIT_SIZES_SUCCESS = 'EDIT_SIZES_SUCCESS';
export const EDIT_SIZES_FAILURE = 'EDIT_SIZES_FAILURE';
export const DELETE_SIZE_SUCCESS = 'DELETE_SIZE_SUCCESS';
export const BULK_UPDATE_SIZE_SUCCESS = 'BULK_UPDATE_SIZE_SUCCESS';

//mycode
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
    const response = await axios.post(`${BASE_URL}/size-uom`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_SIZES_SUCCESS' });
    const successMessage = response?.message || 'Size created successfully';
    toast.success(successMessage);
    dispatch(fetchSizes());
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding size');
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

    const response = await axios.patch(`${BASE_URL}/size-uom/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_SIZES_SUCCESS' });
    const successMessage = response?.message || 'Size updated successfully'
    toast.success(successMessage)
    dispatch(fetchSizes());
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error editing size');
    dispatch({
      type: 'EDIT_SIZES_FAILURE',
      payload: error.response?.data?.message || 'Error editing size',
    });
  }
};

export const deleteSize = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${BASE_URL}/size-uom/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'DELETE_SIZE_SUCCESS', payload: id });
    const successMessage = response?.message || 'Size deleted successfully'
    toast.success(successMessage);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete size');
  }
}

export const bulkUpdateSizeStatus = (ids, status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'size-uom',
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchSizes());
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update size status.');
  }
};
