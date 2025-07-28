import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';
export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_FAILURE';
export const ADD_SUBCATEGORY_REQUEST = 'ADD_CATEGORY_FAILURE';
export const ADD_SUBCATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_SUBCATEGORY_FAILURE = 'ADD_SUBCATEGORY_FAILURE';
export const LIST_SUBCATEGORY_REQUEST = 'LIST_SUBCATEGORY_REQUEST';
export const LIST_SUBCATEGORY_SUCCESS = 'LIST_SUBCATEGORY_REQUEST';
export const LIST_SUBCATEGORY_FAILURE = 'LIST_SUBCATEGORY_REQUEST';
export const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_FAILURE = 'EDIT_CATEGORY_FAILURE';
export const EDIT_CATEGORY_REQUEST = 'EDIT_CATEGORY_REQUEST';
export const EDIT_SUBCATEGORY_REQUEST = 'EDIT_SUBCATEGORY_REQUEST';
export const EDIT_SUBCATEGORY_SUCCESS = 'EDIT_SUBCATEGORY_SUCCESS';
export const EDIT_SUBCATEGORY_FAILURE = 'EDIT_SUBCATEGORY_FAILURE';
export const EDIT_LISTSUBCATEGORY_SUCCESS = 'EDIT_LISTSUBCATEGORY_SUCCESS';
export const EDIT_LISTSUBCATEGORY_FAILURE = 'EDIT_SUBCATEGORY_FAILURE';
export const FETCH_SUBCATEGORY_BY_ID_SUCCESS = 'FETCH_SUBCATEGORY_BY_ID_SUCCESS';
export const FETCH_LISTSUBCATEGORY_BY_ID_SUCCESS = 'FETCH_LISTSUBCATEGORY_BY_ID_SUCCESS';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_SUBCATEGORY_SUCCESS = 'DELETE_SUBCATEGORY_SUCCESS';
export const DELETE_LISTSUBCATEGORY_SUCCESS = 'DELETE_LISTSUBCATEGORY_SUCCESS';

export const fetchCategories = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
      // const loadingToastId = toast.loading('Loading categories...');
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response', response)
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
      //  toast.dismiss(loadingToastId);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch categories');
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

   const response =  await axios.post(`${BASE_URL}/categories`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_CATEGORY_SUCCESS' });
    const successMessage = response?.message || 'Category created successfully'
     toast.success(successMessage);
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

    const response = await axios.post(`${BASE_URL}/categories`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: 'ADD_SUBCATEGORY_SUCCESS' });
     const successMessage = response?.message || 'Subcategory created successfully'
         toast.success(successMessage)
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

   const response =  await axios.post(`${BASE_URL}/categories`, formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    dispatch({ type: 'LIST_SUBCATEGORY_SUCCESS' });
    const successMessage = response?.message || 'List SubCategory Created Sucessfully'
    toast.success(successMessage);
    dispatch(fetchCategories());
  } catch (error) {
    dispatch({
      type: 'LIST_SUBCATEGORY_FAILURE',
      payload: error.response?.data?.message || error.message || 'Error adding listsubcategory',
    });
  }
};

export const editCategory = (id, formData) => async (dispatch) => {
  dispatch({ type: 'EDIT_CATEGORY_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${BASE_URL}/categories/update/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({ type: 'EDIT_CATEGORY_SUCCESS' });
    const successMessage = response?.message || 'Category updated successfully'
         toast.success(successMessage)
    dispatch(fetchCategories());
  } catch (error) {
    dispatch({
      type: 'EDIT_CATEGORY_FAILURE',
      payload: error?.response?.data?.message || 'Update failed',
    });
  }
};

export const fetchSubCategoryById = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_SUBCATEGORY_BY_ID_SUCCESS, payload: res.data });
  } catch (err) {
    toast.error("Failed to fetch subcategory.");
  }
};

export const updateSubCategory = (id, updatedData) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.patch(`${BASE_URL}/categories/update/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: EDIT_SUBCATEGORY_SUCCESS, payload: res.data });
    const successMessage = res?.message || "Subcategory updated successfully"
    toast.success(successMessage);
  } catch (err) {
    toast.error("Failed to update subcategory.");
  }
}

export const updateListSubCategory = (id, updatedData) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.patch(`${BASE_URL}/categories/update/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: EDIT_LISTSUBCATEGORY_SUCCESS, payload: res.data });
    const successMessage = res?.message || "ListSubcategory updated successfully"
    toast.success(successMessage);
  } catch (err) {
    toast.error("Failed to update subcategory.");
  }
}

export const fetchListSubCategoryById = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_LISTSUBCATEGORY_BY_ID_SUCCESS, payload: res.data });
  } catch (err) {
    toast.error("Failed to fetch Listsubcategory.");
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
   const response =  await axios.delete(`${BASE_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchCategories());
    const successMessage = response?.message || "Category deleted successfully"
    toast.success(successMessage);
  } catch (err) {
    toast.error("Failed to delete category.");
  }
}

export const deleteSubCategory = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
   const response =  await axios.delete(`${BASE_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchCategories());
    const successMessage = response?.message || "Subcategory deleted successfully"
    toast.success(successMessage);
  } catch (err) {
    toast.error("Failed to delete subcategory.");
  }
}

export const deleteListSubCategory = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
   const response =  await axios.delete(`${BASE_URL}/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchCategories());
    const successMessage = response?.message || "ListSubcategory deleted successfully"
    toast.success(successMessage);
  } catch (err) {
    toast.error("Failed to delete ListSubcategory.");
  }
}