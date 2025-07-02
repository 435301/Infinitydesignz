import axios from "axios";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE ='ADD_CATEGORY_FAILURE';
export const ADD_CATEGORY_REQUEST ='ADD_CATEGORY_FAILURE';
export const ADD_SUBCATEGORY_REQUEST ='ADD_CATEGORY_FAILURE';
export const ADD_SUBCATEGORY_SUCCESS ='ADD_CATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE='ADD_SUBCATEGORY_FAILURE';
export const LIST_SUBCATEGORY_REQUEST ='LIST_SUBCATEGORY_REQUEST';
export const LIST_SUBCATEGORY_SUCCESS ='LIST_SUBCATEGORY_REQUEST';
export const LIST_SUBCATEGORY_FAILURE ='LIST_SUBCATEGORY_REQUEST';

const BASE_URL ='http://68.183.89.229:4005/categories';

export const fetchCategories = () => {
  
  return async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get('http://68.183.89.229:4005/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response', response)
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

export const addCategory = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_CATEGORY_REQUEST' });
  try {
     const token = localStorage.getItem('token');
      console.log('tokenadd', token)

    await axios.post('http://68.183.89.229:4005/categories', formData, {
       headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
      },
    });
    dispatch({ type: 'ADD_CATEGORY_SUCCESS' });
    dispatch(fetchCategories()); 
  } catch (error) {
    dispatch({
      type: 'ADD_CATEGORY_FAILURE',
      payload: error.message || 'Error adding category',
    });
  }
};
export const addSubCategory = (formData) => async (dispatch) => {
  dispatch({ type: 'ADD_SUBCATEGORY_REQUEST' });

  try {
    const token = localStorage.getItem('token');

    await axios.post('http://68.183.89.229:4005/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: 'ADD_SUBCATEGORY_SUCCESS' });
    dispatch(fetchCategories());
  } catch (error) {
    dispatch({
      type: 'ADD_SUBCATEGORY_FAILURE',
      payload: error.response?.data?.message || error.message || 'Error adding subcategory',
    });
  }
};

export const listSubCategory = (formData) => async (dispatch) => {
  dispatch({ type: 'LIST_SUBCATEGORY_REQUEST' });

  try {
    const token = localStorage.getItem('token');

    await axios.post('http://68.183.89.229:4005/categories', formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 10000, // 10 seconds
    });

    dispatch({ type: 'LIST_SUBCATEGORY_SUCCESS' });
    dispatch(fetchCategories());
  } catch (error) {
    dispatch({
      type: 'LIST_SUBCATEGORY_FAILURE',
      payload: error.response?.data?.message || error.message || 'Error adding listsubcategory',
    });
  }
};
