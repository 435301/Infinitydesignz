import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_FILTERLIST_REQUEST = 'FETCH_FILTERLIST_REQUEST';
export const FETCH_FILTERLIST_SUCCESS = 'FETCH_FILTERLIST_SUCCESS';
export const FETCH_FILTERLIST_FAILURE = 'FETCH_FILTERLIST_FAILURE';
export const ADD_FILTERLIST_REQUEST ='ADD_FILTERLIST_REQUEST';
export const ADD_FILTERLIST_SUCCESS ='ADD_FILTERLIST_SUCCESS';
export const ADD_FILTERLIST_FAILURE ='ADD_FILTERLIST_FAILURE';
export const EDIT_FILTERLIST_REQUEST='EDIT_FILTERLIST_REQUEST';
export const EDIT_FILTERLIST_SUCCESS='EDIT_FILTERLIST_SUCCESS';
export const EDIT_FILTERLIST_FAILURE='EDIT_FILTERLIST_FAILURE';
export const DELETE_FILTERLIST_SUCCESS ='DELETE_FILTERLIST_SUCCESS'


export const fetchFilterLists = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_FILTERLIST_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/filter-lists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_FILTERLIST_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch filter lists');
      dispatch({
        type: FETCH_FILTERLIST_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addFilterList = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_FILTERLIST_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/filter-lists`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_FILTERLIST_SUCCESS' , payload: response.data});
     toast.success(`Filter List created succefully`);
    dispatch(fetchFilterLists());
  } catch (error) {
    console.error('Error Response', error?.response?.data)
    dispatch({
      type: 'ADD_FILTERLIST_FAILURE',
      payload: error.response?.data?.message || 'Error adding filter list',
    });
    throw error; 
  }
};


export const editFilterList = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_FILTERLIST_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload; 

    await axios.patch(`${BASE_URL}/filter-lists/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_FILTERLIST_FAILURE' });
    toast.success('Filter list updated Successfully')
    dispatch(fetchFilterLists());
  } catch (error) {
    dispatch({
      type: 'EDIT_FILTERLIST_FAILURE',
      payload: error.response?.data?.message || 'Error editing filter list',
    });
  }
};

export const deleteFilterList = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/filter-lists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_FILTERLIST_SUCCESS', payload: id });
    dispatch(fetchFilterLists(id));
    toast.success('Filter List deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete filter List.');
    console.error(error);
  }
};


