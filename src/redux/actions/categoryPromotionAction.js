import axios from "axios";
import BASE_URL from "../../config/config";
import { toast } from "react-toastify";

export const FETCH_HOME_CATEGORY_PROMOTIONS_REQUEST = "FETCH_HOME_CATEGORY_PROMOTIONS_REQUEST";
export const FETCH_HOME_CATEGORY_PROMOTIONS_SUCCESS = "FETCH_HOME_CATEGORY_PROMOTIONS_SUCCESS";
export const FETCH_HOME_CATEGORY_PROMOTIONS_FAILURE = "FETCH_HOME_CATEGORY_PROMOTIONS_FAILURE";

export const CREATE_HOME_CATEGORY_PROMOTION_REQUEST = "CREATE_HOME_CATEGORY_PROMOTION_REQUEST";
export const CREATE_HOME_CATEGORY_PROMOTION_SUCCESS = "CREATE_HOME_CATEGORY_PROMOTION_SUCCESS";
export const CREATE_HOME_CATEGORY_PROMOTION_FAILURE = "CREATE_HOME_CATEGORY_PROMOTION_FAILURE";

export const UPDATE_HOME_CATEGORY_PROMOTION_REQUEST = "UPDATE_HOME_CATEGORY_PROMOTION_REQUEST";
export const UPDATE_HOME_CATEGORY_PROMOTION_SUCCESS = "UPDATE_HOME_CATEGORY_PROMOTION_SUCCESS";
export const UPDATE_HOME_CATEGORY_PROMOTION_FAILURE = "UPDATE_HOME_CATEGORY_PROMOTION_FAILURE";

export const DELETE_HOME_CATEGORY_PROMOTION_REQUEST = "DELETE_HOME_CATEGORY_PROMOTION_REQUEST";
export const DELETE_HOME_CATEGORY_PROMOTION_SUCCESS = "DELETE_HOME_CATEGORY_PROMOTION_SUCCESS";
export const DELETE_HOME_CATEGORY_PROMOTION_FAILURE = "DELETE_HOME_CATEGORY_PROMOTION_FAILURE";

// Fetch all
export const fetchHomeCategoryPromotions = () => async (dispatch) => {
  try {
     const token = localStorage.getItem('token');
    dispatch({ type: FETCH_HOME_CATEGORY_PROMOTIONS_REQUEST });
    const response = await axios.get(`${BASE_URL}/home-category-promotions`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    dispatch({ type: FETCH_HOME_CATEGORY_PROMOTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_HOME_CATEGORY_PROMOTIONS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create
export const createHomeCategoryPromotion = (promotionData) => async (dispatch) => {
  try {
     const token = localStorage.getItem('token');
    dispatch({ type: CREATE_HOME_CATEGORY_PROMOTION_REQUEST });
    const response = await axios.post(`${BASE_URL}/home-category-promotions`, promotionData,{
         headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    dispatch({ type: CREATE_HOME_CATEGORY_PROMOTION_SUCCESS, payload: response.data });
     dispatch(fetchHomeCategoryPromotions());
     toast.success(response.data.message || 'Home Category Promotion created successfully');
  } catch (error) {
    dispatch({
      type: CREATE_HOME_CATEGORY_PROMOTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update
export const updateHomeCategoryPromotion = (id, promotionData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    dispatch({ type: UPDATE_HOME_CATEGORY_PROMOTION_REQUEST });
    const  response  = await axios.patch(`${BASE_URL}/home-category-promotions/${id}`, promotionData,{
         headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    dispatch({ type: UPDATE_HOME_CATEGORY_PROMOTION_SUCCESS, payload: response.data });
     dispatch(fetchHomeCategoryPromotions());
     toast.success(response.data.message || 'Home Category Promotion updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_HOME_CATEGORY_PROMOTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete
export const deleteHomeCategoryPromotion = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    dispatch({ type: DELETE_HOME_CATEGORY_PROMOTION_REQUEST });
   const response =  await axios.delete(`${BASE_URL}/home-category-promotions/${id}`,{
         headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    dispatch({ type: DELETE_HOME_CATEGORY_PROMOTION_SUCCESS, payload: id });
    dispatch(fetchHomeCategoryPromotions());
     toast.success(response.data.message || 'Home Category Promotion deleted successfully');
  } catch (error) {
    dispatch({
      type: DELETE_HOME_CATEGORY_PROMOTION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};