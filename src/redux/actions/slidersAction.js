import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_SLIDERS_REQUEST = 'FETCH_SLIDERS_REQUEST';
export const FETCH_SLIDERS_SUCCESS = 'FETCH_SLIDERS_SUCCESS';
export const FETCH_SLIDERS_FAILURE = 'FETCH_SLIDERS_FAILURE';
export const ADD_SLIDERS_REQUEST ='ADD_SLIDERS_REQUEST';
export const ADD_SLIDERS_SUCCESS ='ADD_SLIDERS_SUCCESS';
export const ADD_SLIDERS_FAILURE ='ADD_SLIDERS_FAILURE';
export const EDIT_SLIDERS_REQUEST='EDIT_SLIDERS_REQUEST';
export const EDIT_SLIDERS_SUCCESS='EDIT_SLIDERS_SUCCESS';
export const EDIT_SLIDERS_FAILURE='EDIT_SLIDERS_FAILURE';
export const DELETE_SLIDERS_SUCCESS ='DELETE_SLIDERS_SUCCESS'
export const FETCH_RIGHTSLIDERS_REQUEST = 'FETCH_RIGHTSLIDERS_REQUEST';
export const FETCH_RIGHTSLIDERS_SUCCESS = 'FETCH_RIGHTSLIDERS_SUCCESS';
export const FETCH_RIGHTSLIDERS_FAILURE = 'FETCH_RIGHTSLIDERS_FAILURE';

export const fetchSliders = (status='') => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SLIDERS_REQUEST });
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/sliders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: status === "all" ? { status: "all" } : {},
      });

      dispatch({ type: FETCH_SLIDERS_SUCCESS, payload: response.data });
      console.log('response',response)
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch sliders');
      dispatch({
        type: FETCH_SLIDERS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addSliders = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_SLIDERS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/sliders`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'ADD_SLIDERS_SUCCESS', payload: response.data });

    const successMessage = response?.data?.message || 'Sliders created successfully';
    toast.success(successMessage);
    dispatch(fetchSliders('all'));
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding sliders');
    console.error('Error Response', error?.response?.data);
    dispatch({
      type: 'ADD_SLIDERS_FAILURE',
      payload: error.response?.data?.message || 'Error adding sliders',
    });
    throw error;
  }
};

export const editSliders = (id, formData) => async (dispatch) => {
  dispatch({ type: 'EDIT_SLIDERS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${BASE_URL}/sliders/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_SLIDERS_SUCCESS' });

    const successMessage = response?.data?.message || 'Sliders updated successfully';
    toast.success(successMessage);

    dispatch(fetchSliders('all'));
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error editing sliders');
    dispatch({
      type: 'EDIT_SLIDERS_FAILURE',
      payload: error.response?.data?.message || 'Error editing sliders',
    });
  }
};


export const deleteSliders = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`${BASE_URL}/sliders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_SLIDERS_SUCCESS', payload: id });

    const successMessage = response?.data?.message || 'Sliders deleted successfully';
    toast.success(successMessage);
    dispatch(fetchSliders('all'));
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete Sliders.');
    console.error(error);
  }
};

export const bulkUpdateSliderStatus = (ids, status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'sliders',
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const successMessage = response?.data?.message || 'Status updated successfully';
    toast.success(successMessage);

    dispatch(fetchSliders('all'));
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update status');
  }
};

export const fetchRightSliders = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_RIGHTSLIDERS_REQUEST });
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/slider-right`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_RIGHTSLIDERS_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      dispatch({
        type: FETCH_RIGHTSLIDERS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};