import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_VARIANTS_REQUEST = 'FETCH_VARIANTS_REQUEST';
export const FETCH_VARIANTS_SUCCESS = 'FETCH_VARIANTS_SUCCESS';
export const FETCH_VARIANTS_FAILURE = 'FETCH_VARIANTS_FAILURE';
export const ADD_VARIANTS_REQUEST ='ADD_VARIANTS_REQUEST';
export const ADD_VARIANTS_SUCCESS ='ADD_VARIANTS_SUCCESS';
export const ADD_VARIANTS_FAILURE ='ADD_VARIANTS_FAILURE';
export const EDIT_VARIANTS_REQUEST='EDIT_VARIANTS_REQUEST';
export const EDIT_VARIANTS_SUCCESS='EDIT_VARIANTS_SUCCESS';
export const EDIT_VARIANTS_FAILURE='EDIT_VARIANTS_FAILURE';
export const DELETE_VARIANTS_SUCCESS = 'DELETE_VARIANTS_SUCCESS'

export const fetchVariants = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_VARIANTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/variants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_VARIANTS_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch variant');
      dispatch({
        type: FETCH_VARIANTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};


export const addVariants = (variants) => async (dispatch) => {
  dispatch({ type: 'ADD_VARIANTS_REQUEST' });

  try {
    const token = localStorage.getItem('token');

    const responses = await Promise.all(
      variants.map(variant => 
        axios.post(`${BASE_URL}/variants`, variant, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      )
    );

    dispatch({ type: 'ADD_VARIANTS_SUCCESS', payload: responses.map(res => res.data) });
  } catch (error) {
    dispatch({
      type: 'ADD_VARIANTS_FAILURE',
      payload: error.response?.data?.message || 'Failed to add variants',
    });
  }
};

export const editVariants = (variants) => async (dispatch) => {
  dispatch({ type: 'EDIT_VARIANTS__REQUEST' });

  try {
    const token = localStorage.getItem('token');

    const responses = await Promise.all(
      variants.map(({ id, ...updateData }) =>
        axios.put(`${BASE_URL}/variants/${id}`, updateData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      )
    );

    dispatch({
      type: 'EDIT_VARIANTS_SUCCESS',
      payload: responses.map((res) => res.data),
    });

    toast.success('Variants updated successfully');
    dispatch(fetchVariants());
    return responses.map(res => res.data);
  } catch (error) {
    dispatch({
      type: 'EDIT_VARIANTS_FAILURE',
      payload: error.response?.data?.message || 'Failed to edit variants',
    });
    toast.error('Failed to update variants');
    throw error;
  }
};

export const deleteVariants = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/variants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchVariants(id));
    toast.success('Variant deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete Variant.');
    console.error(error);
  }
};