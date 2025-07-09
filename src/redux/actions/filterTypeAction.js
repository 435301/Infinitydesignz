import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_FILTERTYPE_REQUEST = 'FETCH_FILTERTYPE_REQUEST';
export const FETCH_FILTERTYPE_SUCCESS = 'FETCH_FILTERTYPE_SUCCESS';
export const FETCH_FILTERTYPE_FAILURE = 'FETCH_FILTERTYPE_FAILURE';
export const ADD_FILTERTYPE_REQUEST ='ADD_FILTERTYPEE_REQUEST';
export const ADD_FILTERTYPE_SUCCESS ='ADD_FILTERTYPE_SUCCESS';
export const ADD_FILTERTYPE_FAILURE ='ADD_FILTERTYPE_FAILURE';
export const EDIT_FILTERTYPE_REQUEST='EDIT_FILTERTYPE_REQUEST';
export const EDIT_FILTERTYPE_SUCCESS='EDIT_FILTERTYPE_SUCCESS';
export const EDIT_FILTERTYPE_FAILURE='EDIT_FILTERTYPE_FAILURE';
export const DELETE_FILTERTYPE_SUCCESS = 'DELETE_FILTERTYPE_SUCCESS'


export const fetchFilterTypes = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_FILTERTYPE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/filter-types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_FILTERTYPE_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch filter type');
      dispatch({
        type: FETCH_FILTERTYPE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addFilterTypes = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_FILTERTYPEE_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${BASE_URL}/filter-types`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_FILTERTYPE_SUCCESS' });
     toast.success(`Filter Type created succefully`);
    dispatch(fetchFilterTypes());
  } catch (error) {
    dispatch({
      type: 'ADD_FILTERTYPE_FAILURE',
      payload: error.response?.data?.message || 'Error adding filter type',
    });
    throw error; 
  }
};


export const editFilterTypes = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_FILTERTYPE_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload; 

    await axios.put(`${BASE_URL}/filter-types/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_FILTERTYPE_SUCCESS' });
    toast.success('filter type updated Successfully')
    dispatch(fetchFilterTypes());
  } catch (error) {
    dispatch({
      type: 'EDIT_FILTERTYPE_FAILURE',
      payload: error.response?.data?.message || 'Error editing filter type',
    });
  }
};

export const deleteFilterType = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/filter-types/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchFilterTypes(id));
    toast.success('Filter Type deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete Filter Type.');
    console.error(error);
  }
};

export const bulkUpdateFilterTypeStatus = (ids,status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'filter-types', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchFilterTypes()); 
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update status');
  }
};
