import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const ADD_PRODUCT_REQUEST ='ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS ='ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE ='ADD_PRODUCT_FAILURE';
export const EDIT_PRODUCT_REQUEST='EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS='EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE='EDIT_PRODUCT_FAILURE';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
export const FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS';

export const fetchProducts = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_PRODUCT_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch product');
      dispatch({
        type: FETCH_PRODUCT_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addProducts = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });
  try {
    const token = localStorage.getItem('token');
   const response = await axios.post(`${BASE_URL}/products`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_PRODUCT_SUCCESS' });
     toast.success(`Product created succefully`);
    dispatch(fetchProducts());
    return response.data;
  } catch (error) {
    dispatch({
      type: 'ADD_PRODUCT_FAILURE',
      payload: error.response?.data?.message || 'Error adding product',
    });
    throw error; 
  }
};


export const editProducts = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_PRODUCT_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload; 

   const response= await axios.put(`${BASE_URL}/products/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_PRODUCT_SUCCESS', payload: response.data  });
    toast.success('product updated Successfully')
    dispatch(fetchProducts());
     return response.data;
  } catch (error) {
    dispatch({
      type: 'EDIT_PRODUCT_FAILURE',
      payload: error.response?.data?.message || 'Error editing product',
    });
    throw error;
  }
};

export const deleteProducts = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchProducts(id));
    toast.success('Product deleted successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete Product.');
    console.error(error);
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_PRODUCT_BY_ID_SUCCESS, payload: res.data });
  } catch (err) {
    toast.error("Failed to fetch subcategory.");
  }
};


export const bulkUpdateProductStatus = (ids,status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'products', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchProducts()); 
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || 'Failed to update status');
  }
};
