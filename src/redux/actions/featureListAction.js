import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_FEATURELIST_REQUEST = 'FETCH_FEATURELIST_REQUEST';
export const FETCH_FEATURELIST_SUCCESS = 'FETCH_FEATURELIST_SUCCESS';
export const FETCH_FEATURELIST_FAILURE = 'FETCH_FEATURELIST_FAILURE';
export const ADD_FEATURELIST_REQUEST ='ADD_FEATURELIST_REQUEST';
export const ADD_FEATURELIST_SUCCESS ='ADD_FEATURELIST_SUCCESS';
export const ADD_FEATURELIST_FAILURE ='ADD_FEATURELIST_FAILURE';
export const EDIT_FEATURELIST_REQUEST='EDIT_FEATURELIST_REQUEST';
export const EDIT_FEATURELIST_SUCCESS='EDIT_FEATURELIST_SUCCESS';
export const EDIT_FEATURELIST_FAILURE='EDIT_FEATURELIST_FAILURE';
export const DELETE_FEATURELIST_SUCCESS ='DELETE_FEATURELIST_SUCCESS'


export const fetchFeatureLists = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_FEATURELIST_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/feature-lists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_FEATURELIST_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch feature lists');
      dispatch({
        type: FETCH_FEATURELIST_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addFeatureList = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_FEATURELIST_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/feature-lists`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'ADD_FEATURELIST_SUCCESS', payload: response.data });

    const successMessage = response?.data?.message || 'Feature List created successfully';
    toast.success(successMessage);

    dispatch(fetchFeatureLists());
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding feature list');
    console.error('Error Response', error?.response?.data);
    dispatch({
      type: 'ADD_FEATURELIST_FAILURE',
      payload: error.response?.data?.message || 'Error adding feature list',
    });
    throw error;
  }
};

export const editFeatureList = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_FEATURELIST_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload;

    const response = await axios.patch(`${BASE_URL}/feature-lists/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_FEATURELIST_SUCCESS' });

    const successMessage = response?.data?.message || 'Feature List updated successfully';
    toast.success(successMessage);

    dispatch(fetchFeatureLists());
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error editing feature list');
    dispatch({
      type: 'EDIT_FEATURELIST_FAILURE',
      payload: error.response?.data?.message || 'Error editing feature list',
    });
  }
};

export const deleteFeatureList = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`${BASE_URL}/feature-lists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_FEATURELIST_SUCCESS', payload: id });

    const successMessage = response?.data?.message || 'Feature List deleted successfully';
    toast.success(successMessage);

    dispatch(fetchFeatureLists(id));
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete Feature List.');
    console.error(error);
  }
};


export const updateFeatureListPriority = ({ id, priority }) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`${BASE_URL}/feature-lists/${id}`, { priority }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    dispatch(fetchFeatureLists()); 
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update priority');
    console.error('Failed to update priority', error);
  }
};
