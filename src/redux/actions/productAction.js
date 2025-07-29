import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';
export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
export const FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS';
export const FETCH_PRODUCT_FEATURES_SUCCESS = 'FETCH_PRODUCT_FEATURES_SUCCESS';
export const FETCH_PRODUCT_FEATURES_REQUEST = 'FETCH_PRODUCT_FEATURES_REQUEST';
export const FETCH_PRODUCT_FEATURES_FAILURE = 'FETCH_PRODUCT_FEATURES_FAILURE';
export const ADD_PRODUCT_FEATURES_REQUEST = 'ADD_PRODUCT_FEATURES_REQUEST';
export const ADD_PRODUCT_FEATURES_SUCCESS = 'ADD_PRODUCT_FEATURES_SUCCESS';
export const ADD_PRODUCT_FEATURES_FAILURE = 'ADD_PRODUCT_FEATURES_FAILURE';
export const EDIT_PRODUCT_FEATURES_REQUEST = 'EDIT_PRODUCT_FEATURES_REQUEST';
export const EDIT_PRODUCT_FEATURES_SUCCESS = 'EDIT_PRODUCT_FEATURES_SUCCESS';
export const EDIT_PRODUCT_FEATURES_FAILURE = 'EDIT_PRODUCT_FEATURES_FAILURE';
export const DELETE_PRODUCT_FEATURE_SUCCESS = 'DELETE_PRODUCT_FEATURE_SUCCESS';
export const FETCH_PRODUCT_FILTERS_SUCCESS = 'FETCH_PRODUCT_FILTERS_SUCCESS';
export const FETCH_PRODUCT_FILTERS_REQUEST = 'FETCH_PRODUCT_FILTERS_REQUEST';
export const FETCH_PRODUCT_FILTERS_FAILURE = 'FETCH_PRODUCT_FILTERS_FAILURE';
export const ADD_PRODUCT_FILTERS_REQUEST = 'ADD_PRODUCT_FILTERS_REQUEST';
export const ADD_PRODUCT_FILTERS_SUCCESS = 'ADD_PRODUCT_FILTERS_SUCCESS';
export const ADD_PRODUCT_FILTERS_FAILURE = 'ADD_PRODUCT_FILTERS_FAILURE';
export const EDIT_PRODUCT_FILTERS_REQUEST = 'EDIT_PRODUCT_FILTERS_REQUEST';
export const EDIT_PRODUCT_FILTERS_SUCCESS = 'EDIT_PRODUCT_FILTERS_SUCCESS';
export const EDIT_PRODUCT_FILTERS_FAILURE = 'EDIT_PRODUCT_FILTERS_FAILURE';
export const DELETE_PRODUCT_FILTERS_SUCCESS = 'DELETE_PRODUCT_FILTERS_SUCCESS';
export const FETCH_VARIANT_IMAGE_SUCCESS = 'FETCH_VARIANT_IMAGE_SUCCESS';

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
    const successMessage = response?.message || `Product created succefully`
    toast.success(successMessage);
    dispatch(fetchProducts());
    return response.data;
  } catch (error) {
     toast.error(error?.response?.data?.message || 'Error adding product');
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

    const response = await axios.put(`${BASE_URL}/products/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_PRODUCT_SUCCESS', payload: response.data });
    const successMessage = response?.message || 'product updated Successfully'
    toast.success(successMessage)
    dispatch(fetchProducts());
    return response.data;
  } catch (error) {
     toast.error(error?.response?.data?.message || 'Error editing product');
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

    const response = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchProducts(id));
    const successMessage = response?.message || 'Product deleted successfully!'
    toast.success(successMessage);
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
    toast.error("Failed to fetch product");
  }
};


export const bulkUpdateProductStatus = (ids, status) => async (dispatch) => {
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


export const fetchProductFeatures = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_PRODUCT_FEATURES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/product-features`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_PRODUCT_FEATURES_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch product features');
      dispatch({
        type: FETCH_PRODUCT_FEATURES_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addProductFeature = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_FEATURES_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/product-features`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_PRODUCT_FEATURES_SUCCESS', payload: response.data });
    const successMessage = response?.message || ` Product Feature created succefully`
    toast.success(successMessage);
    dispatch(fetchProductFeatures());
  } catch (error) {
    console.error('Error Response', error?.response?.data)
     toast.error(error?.response?.data?.message || 'Error adding product feature');
    dispatch({
      type: 'ADD_PRODUCT_FEATURES_FAILURE',
      payload: error.response?.data?.message || 'Error adding product feature ',
    });
    throw error;
  }
};


export const editProductFeature = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_PRODUCT_FEATURES_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload;

    const response = await axios.patch(`${BASE_URL}/product-features/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_PRODUCT_FEATURES_SUCCESS' });
    const successMessage = response?.message || 'Product Feature updated Successfully'
    toast.success(successMessage);
    dispatch(fetchProductFeatures());
  } catch (error) {
     toast.error(error?.response?.data?.message || 'Error editing product feature');
    dispatch({
      type: 'EDIT_PRODUCT_FEATURES_FAILURE',
      payload: error.response?.data?.message || 'Error editing product feature ',
    });
  }
};

export const deleteProductFeature = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`${BASE_URL}/product-features/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_PRODUCT_FEATURE_SUCCESS', payload: id });
    dispatch(fetchProductFeatures(id));
    const successMessage = response?.message || 'Product Feature deleted successfully!'
    toast.success(successMessage);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete product feature.');
    console.error(error);
  }
};


export const fetchProductFilters = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_PRODUCT_FILTERS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/product-filters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: FETCH_PRODUCT_FILTERS_SUCCESS, payload: response.data });
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch product filters');
      dispatch({
        type: FETCH_PRODUCT_FILTERS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addProductFilter = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_FILTERS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/product-features`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_PRODUCT_FILTERS_SUCCESS`', payload: response.data });
    const successMessage = response?.message || ` Product Filter created succefully`
    toast.success(successMessage);
    dispatch(fetchProductFilters());
  } catch (error) {
    console.error('Error Response', error?.response?.data)
     toast.error(error?.response?.data?.message || 'Error adding product filter');
    dispatch({
      type: 'ADD_PRODUCT_FILTERS_FAILURE',
      payload: error.response?.data?.message || 'Error adding product filter ',
    });
    throw error;
  }
};


export const editProductFilter = (payload) => async (dispatch) => {
  dispatch({ type: 'EDIT_PRODUCT_FILTERS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const { id, ...updateData } = payload;

    const response = await axios.patch(`${BASE_URL}/product-filters/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'EDIT_PRODUCT_FILTERS_SUCCESS' });
    const successMessage = response?.message || 'Product Filter updated Successfully'
    toast.success(successMessage)
    dispatch(fetchProductFilters());
  } catch (error) {
     toast.error(error?.response?.data?.message || 'Error editing product filter');
    dispatch({
      type: 'EDIT_PRODUCT_FILTERS_FAILURE',
      payload: error.response?.data?.message || 'Error editing product filter ',
    });
  }
};

export const deleteProductFilter = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

   const response =  await axios.delete(`${BASE_URL}/product-filters/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: 'DELETE_PRODUCT_FILTERS_SUCCESS', payload: id });
    dispatch(fetchProductFilters(id));
    const successMessage = response?.message || 'Product Filter deleted successfully!'
    toast.success(successMessage);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete product filter.');
    console.error(error);
  }
};

export const fetchVariantImagesById = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/images/variant/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_VARIANT_IMAGE_SUCCESS, payload: res.data });
  } catch (err) {
    toast.error("Failed to fetch variant images.");
  }
};