import axios from "axios";
import BASE_URL from "../../config/config";
import { getAdminToken } from "../../utils/adminAuth";
import { toast } from "react-toastify";

export const FETCH_PRODUCT_PROMOTIONS_REQUEST = "FETCH_PRODUCT_PROMOTIONS_REQUEST";
export const FETCH_PRODUCT_PROMOTIONS_SUCCESS = "FETCH_PRODUCT_PROMOTIONS_SUCCESS";
export const FETCH_PRODUCT_PROMOTIONS_FAILURE = "FETCH_PRODUCT_PROMOTIONS_FAILURE";

export const CREATE_PRODUCT_PROMOTION_REQUEST = "CREATE_PRODUCT_PROMOTION_REQUEST";
export const CREATE_PRODUCT_PROMOTION_SUCCESS = "CREATE_PRODUCT_PROMOTION_SUCCESS";
export const CREATE_PRODUCT_PROMOTION_FAILURE = "CREATE_PRODUCT_PROMOTION_FAILURE";

export const UPDATE_PRODUCT_PROMOTION_REQUEST = "UPDATE_PRODUCT_PROMOTION_REQUEST";
export const UPDATE_PRODUCT_PROMOTION_SUCCESS = "UPDATE_PRODUCT_PROMOTION_SUCCESS";
export const UPDATE_PRODUCT_PROMOTION_FAILURE = "UPDATE_PRODUCT_PROMOTION_FAILURE";

export const DELETE_PRODUCT_PROMOTION_REQUEST = "DELETE_PRODUCT_PROMOTION_REQUEST";
export const DELETE_PRODUCT_PROMOTION_SUCCESS = "DELETE_PRODUCT_PROMOTION_SUCCESS";
export const DELETE_PRODUCT_PROMOTION_FAILURE = "DELETE_PRODUCT_PROMOTION_FAILURE";


export const fetchProductPromotions = (page = 1, limit = 20) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_PROMOTIONS_REQUEST });

    const response = await axios.get(`${BASE_URL}/product-promotions?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`
      }
    });
    dispatch({
      type: FETCH_PRODUCT_PROMOTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_PROMOTIONS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

export const createProductPromotion = (promotionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_PROMOTION_REQUEST });
    const response = await axios.post(`${BASE_URL}/product-promotions`, promotionData, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,     
     }
    });

    dispatch({
      type: CREATE_PRODUCT_PROMOTION_SUCCESS,
      payload: response.data,
    });

    dispatch(fetchProductPromotions()); 
    toast.success(response.data?.message || 'Product promotion created successfully')
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_PROMOTION_FAILURE,
      payload: error.response?.data || error.message,
    });
    toast.error(error.response?.message || 'error creating product promotion');
  }
};


export const updateProductPromotion = (id, priority) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_PROMOTION_REQUEST });

    const response = await axios.patch(`${BASE_URL}/product-promotions/${id}`,
        { priority }, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      }
    });
    dispatch({
      type: UPDATE_PRODUCT_PROMOTION_SUCCESS,
      payload: response.data,
    });

    dispatch(fetchProductPromotions()); 
    toast.success(response.data?.message || 'Product promotion updated successfully')
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_PROMOTION_FAILURE,
      payload: error.response?.data || error.message,
    });
    toast.error(error.response?.message || 'error updating product promotion');

  }
};


export const deleteProductPromotion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_PROMOTION_REQUEST });

   const response =  await axios.delete(`${BASE_URL}/product-promotions/${id}`, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      }
    });

    dispatch({
      type: DELETE_PRODUCT_PROMOTION_SUCCESS,
      payload: id,
    });

    dispatch(fetchProductPromotions()); 
    toast.success(response.data?.message || 'Product promotion disabled')
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_PROMOTION_FAILURE,
      payload: error.response?.data || error.message,
    });
    toast.error(error.response?.message || 'error deleting product promotion');
  }
};

export const bulkUpdateProductPromotionStatus = (ids,status) => async (dispatch) => {
  try {
    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'promotions', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }
    );
    dispatch(fetchProductPromotions()); 
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update promotion status');
    console.error(error);
    toast.error(error.response?.message || 'Failed to update promotion status.');
  }
};