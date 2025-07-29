import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";
import { fetchFilterTypes } from "./filterTypeAction";

export const FETCH_FEATURETYPE_REQUEST = 'FETCH_FEATURETYPE_REQUEST';
export const FETCH_FEATURETYPE_SUCCESS = 'FETCH_FEATURETYPE_SUCCESS';
export const FETCH_FEATURETYPE_FAILURE = 'FETCH_FEATURETYPE_FAILURE';

export const ADD_FEATURETYPE_REQUEST = 'ADD_FEATURETYPE_REQUEST';
export const ADD_FEATURETYPE_SUCCESS = 'ADD_FEATURETYPE_SUCCESS';
export const ADD_FEATURETYPE_FAILURE = 'ADD_FEATURETYPE_FAILURE';

export const EDIT_FEATURETYPE_REQUEST = 'EDIT_FEATURETYPE_REQUEST';
export const EDIT_FEATURETYPE_SUCCESS = 'EDIT_FEATURETYPE_SUCCESS';
export const EDIT_FEATURETYPE_FAILURE = 'EDIT_FEATURETYPE_FAILURE';

export const DELETE_FEATURE_TYPE_SUCCESS = 'DELETE_FEATURE_TYPE_SUCCESS';

export const fetchFeatureTypes = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_FEATURETYPE_REQUEST });
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/feature-types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_FEATURETYPE_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch featureTypes');
      dispatch({
        type: FETCH_FEATURETYPE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addFeatureTypes = (formData) => async (dispatch) => {
  dispatch({ type: ADD_FEATURETYPE_REQUEST });
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${BASE_URL}/feature-types`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: ADD_FEATURETYPE_SUCCESS });
    const successMessage = response?.data?.message || 'Feature Type created successfully';
    toast.success(successMessage);
    dispatch(fetchFeatureTypes());
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error adding feature type');
    dispatch({
      type: ADD_FEATURETYPE_FAILURE,
      payload: error.response?.data?.message || 'Error adding featureType',
    });
    throw error;
  }
};

export const editFeatureTypes = (payload) => async (dispatch) => {
  dispatch({ type: EDIT_FEATURETYPE_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload;

    const response = await axios.put(`${BASE_URL}/feature-types/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: EDIT_FEATURETYPE_SUCCESS });

    const successMessage = response?.data?.message || 'Feature Type updated successfully';
    toast.success(successMessage);

    dispatch(fetchFeatureTypes());
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error editing feature type');
    dispatch({
      type: EDIT_FEATURETYPE_FAILURE,
      payload: error.response?.data?.message || 'Error editing featureType',
    });
  }
};

export const deleteFeatureType = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`${BASE_URL}/feature-types/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'DELETE_FEATURE_TYPE_SUCCESS', payload: id });
    const successMessage = response?.data?.message || 'Feature Type deleted successfully';
    toast.success(successMessage);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete Feature Type.');
    console.error(error);
  }
};

export const bulkUpdateFeatureTypeStatus = (ids, status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'feature-types',
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

    dispatch(fetchFilterTypes());
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update status');
  }
};
