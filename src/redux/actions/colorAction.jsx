import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_COLOR_REQUEST = 'FETCH_COLOR_REQUEST';
export const FETCH_COLOR_SUCCESS = 'FETCH_COLOR_SUCCESS';
export const FETCH_COLOR_FAILURE = 'FETCH_COLOR_FAILURE';
export const ADD_COLORS_REQUEST = 'ADD_COLORS_REQUEST';
export const ADD_COLORS_SUCCESS = 'ADD_COLORS_SUCCESS';
export const ADD_COLORS_FAILURE = 'ADD_COLORS_FAILURE';
export const EDIT_COLORS_REQUEST = 'EDIT_COLORS_REQUEST';
export const EDIT_COLORS_SUCCESS = 'EDIT_COLORS_SUCCESS';
export const EDIT_COLORS_FAILURE = 'EDIT_COLORS_FAILURE'
export const DELETE_COLOR_SUCCESS = 'DELETE_COLOR_SUCCESS';
export const BULK_UPDATE_COLOR_SUCCESS = 'BULK_UPDATE_COLOR_SUCCESS';

export const fetchColors = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_COLOR_REQUEST });

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/colors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_COLOR_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch colors');
      dispatch({
        type: FETCH_COLOR_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addColors = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_COLORS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${BASE_URL}/colors`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'ADD_COLOR_SUCCESS' });
    toast.success('Color created successfully')
    dispatch(fetchColors());
  } catch (error) {
    dispatch({
      type: 'ADD_COLOR_FAILURE',
      payload: error.response?.data?.message || 'Error adding colors',
    });
    throw error;
  }
};

export const editColors = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_COLORS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload;
    await axios.patch(`${BASE_URL}/colors/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_COLORS_SUCCESS' });
    toast.success('Color updated successfully')
    dispatch(fetchColors());
  } catch (error) {
    dispatch({
      type: 'EDIT_COLORS_FAILURE',
      payload: error.response?.data?.message || 'Error editing colors',
    });
    throw error;
  }
};

export const deleteColor = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/colors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchColors(id));
    toast.success('Color deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete color.');
    console.error(error);
  }
};

export const bulkUpdateColorStatus = (ids,status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'colors', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchColors()); 
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update color status.');
  }
};