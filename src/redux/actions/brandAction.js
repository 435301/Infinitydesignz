import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_BRAND_REQUEST = 'FETCH_BRAND_REQUEST';
export const FETCH_BRAND_SUCCESS = 'FETCH_BRAND_SUCCESS';
export const FETCH_BRAND_FAILURE = 'FETCH_BRAND_FAILURE';
export const ADD_BRAND_REQUEST ='ADD_BRAND_REQUEST';
export const ADD_BRAND_SUCCESS ='ADD_BRAND_SUCCESS';
export const ADD_BRAND_FAILURE ='ADD_BRAND_FAILURE';
export const EDIT_BRAND_REQUEST='EDIT_BRAND_REQUEST';
export const EDIT_BRAND_SUCCESS='EDIT_BRAND_SUCCESS';
export const EDIT_BRAND_FAILURE='EDIT_BRAND_FAILURE';



export const fetchBrands = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_BRAND_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/brands`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response', response)
      dispatch({ type: FETCH_BRAND_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch brand');
      dispatch({
        type: FETCH_BRAND_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addBrands = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_BRAND_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${BASE_URL}/brands`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_BRAND_SUCCESS' });
     toast.success(`Brand created succefully`);
    dispatch(fetchBrands());
  } catch (error) {
    dispatch({
      type: 'ADD_BRAND_FAILURE',
      payload: error.response?.data?.message || 'Error adding brand',
    });
    throw error; 
  }
};


export const editBrands = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_BRAND_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload; 

    await axios.put(`${BASE_URL}/brands/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_BRAND_SUCCESS' });
    toast.success('Brand updated Successfully')
    dispatch(fetchBrands());
  } catch (error) {
    dispatch({
      type: 'EDIT_BRAND_FAILURE',
      payload: error.response?.data?.message || 'Error editing brand',
    });
  }
};
