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
export const DELETE_BRAND_SUCCESS = 'DELETE_BRAND_SUCCESS';
export const BULK_UPDATE_BRAND_SUCCESS = 'BULK_UPDATE_BRAND_SUCCESS';

export const fetchBrands = (status = '') => {

  return async (dispatch) => {

    dispatch({ type: FETCH_BRAND_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/brands`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: status === "all" ? { status: "all" } : {},
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
    const response = await axios.post(`${BASE_URL}/brands`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('res',response.data.message)
    dispatch({ type: 'ADD_BRAND_SUCCESS' });
     const successMessage = response?.message || 'Brand created successfully';
    toast.success(successMessage);
    dispatch(fetchBrands('all'));
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding brand');
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

   const response=  await axios.put(`${BASE_URL}/brands/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_BRAND_SUCCESS' });
    const successMessage = response?.message || 'Brand edited successfully';
    toast.success(successMessage);
    dispatch(fetchBrands('all'));
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Error editing brand');
    dispatch({
      type: 'EDIT_BRAND_FAILURE',
      payload: error.response?.data?.message || 'Error editing brand',
    });
  }
};


export const deleteBrand = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

   const response =  await axios.delete(`${BASE_URL}/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchBrands('all'));
    const deleteMessage = response?.message || 'Brand deleted successfully!'
    toast.success(deleteMessage)
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete brand.');
    console.error(error);
  }
};

export const bulkUpdateBrandStatus = (ids,status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'brands', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchBrands('all')); 
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update brand status');
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update brand status.');
  }
};
