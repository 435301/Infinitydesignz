import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_FEATURESET_REQUEST = 'FETCH_FEATURESET_REQUEST';
export const FETCH_FEATURESET_SUCCESS = 'FETCH_FEATURESET_SUCCESS';
export const FETCH_FEATURESET_FAILURE = 'FETCH_FEATURESET_FAILURE';
export const ADD_FEATURESET_REQUEST ='ADD_FEATURESET_REQUEST';
export const ADD_FEATURESET_SUCCESS ='ADD_FEATURESET_SUCCESS';
export const ADD_FEATURESET_FAILURE ='ADD_FEATURESET_FAILURE';
export const EDIT_FEATURESET_REQUEST='EDIT_FEATURESET_REQUEST';
export const EDIT_FEATURESET_SUCCESS='EDIT_FEATURESET_SUCCESS';
export const EDIT_FEATURESET_FAILURE='EDIT_FEATURESET_FAILURE';
export const DELETE_FEATURESET_SUCCESS ='DELETE_FEATURESET_SUCCESS'


export const fetchFeatureSets = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_FEATURESET_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/feature-sets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_FEATURESET_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch feature sets');
      dispatch({
        type: FETCH_FEATURESET_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addFeatureSet = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_FEATURESET_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/feature-sets`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_FEATURESET_SUCCESS' , payload: response.data});
     toast.success(`Feature Set created succefully`);
    dispatch(fetchFeatureSets());
    console.log('Sending to API:', formData);
  } catch (error) {
    console.error('Error Response', error?.response?.data)
    dispatch({
      type: 'ADD_FEATURESET_FAILURE',
      payload: error.response?.data?.message || 'Error adding feature set',
    });
    throw error; 
  }
};


export const editFeatureSet = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_FEATURESET_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload; 

    await axios.patch(`${BASE_URL}/feature-sets/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_FEATURESET_SUCCESS' });
    toast.success('Feature Set updated Successfully')
    dispatch(fetchFeatureSets());
  } catch (error) {
    dispatch({
      type: 'EDIT_FEATURESET_FAILURE',
      payload: error.response?.data?.message || 'Error editing feature set',
    });
  }
};

export const deleteFeatureSet = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/feature-sets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_FEATURESET_SUCCESS', payload: id });
    dispatch(fetchFeatureSets(id));
    toast.success('Feature Set deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete Feature Set.');
    console.error(error);
  }
};

export const bulkUpdateFeatureTypeStatus = (ids,status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'feature-sets', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchFeatureSets()); 
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update status');
  }
};


export const updateFeatureSetPriority = ({ id, priority }) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`${BASE_URL}/feature-sets/${id}`, { priority }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    dispatch(fetchFeatureSets()); 
  } catch (error) {
    console.error('Failed to update priority', error);
  }
};