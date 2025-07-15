import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_FILTERSET_REQUEST = 'FETCH_FILTERSET_REQUEST';
export const FETCH_FILTERSET_SUCCESS = 'FETCH_FILTERSET_SUCCESS';
export const FETCH_FILTERSET_FAILURE = 'FETCH_FILTERSET_FAILURE';
export const ADD_FILTERSET_REQUEST ='ADD_FILTERSET_REQUEST';
export const ADD_FILTERSET_SUCCESS ='ADD_FILTERSET_SUCCESS';
export const ADD_FILTERSET_FAILURE ='ADD_FILTERSET_FAILURE';
export const EDIT_FILTERSET_REQUEST='EDIT_FILTERSET_REQUEST';
export const EDIT_FILTERSET_SUCCESS='EDIT_FILTERSET_SUCCESS';
export const EDIT_FILTERSET_FAILURE='EDIT_FILTERSET_FAILURE';
export const DELETE_FILTERSET_SUCCESS ='DELETE_FILTERSET_SUCCESS'


export const fetchFilterSets = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_FILTERSET_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/filter-sets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_FILTERSET_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch filter sets');
      dispatch({
        type: FETCH_FILTERSET_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addFilterSet = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_FILTERSET_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/filter-sets`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_FILTERSET_SUCCESS' , payload: response.data});
     toast.success(`Filter Set created succefully`);
    dispatch(fetchFilterSets());
    console.log('Sending to API:', formData);
  } catch (error) {
    console.error('Error Response', error?.response?.data)
    dispatch({
      type: 'ADD_FILTERSET_FAILURE',
      payload: error.response?.data?.message || 'Error adding filter set',
    });
    throw error; 
  }
};


export const editFilterSet = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_FILTERSET_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload; 

    await axios.patch(`${BASE_URL}/filter-sets/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_FILTERSET_SUCCESS' });
    toast.success('Filter Set updated Successfully')
    dispatch(fetchFilterSets());
  } catch (error) {
    dispatch({
      type: 'EDIT_FILTERSET_FAILURE',
      payload: error.response?.data?.message || 'Error editing filter set',
    });
  }
};

export const deleteFilterSet = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/filter-sets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_FILTERSET_SUCCESS', payload: id });
    dispatch(fetchFilterSets(id));
    toast.success('Filter Set deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete filter Set.');
    console.error(error);
  }
};


