
import axios from 'axios';
import BASE_URL from '../../config/config';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchUserProductDetailsById = (productId, variantId = null) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });

  try {
    const query = variantId ? `?productId=${productId}&variantId=${variantId}` : `?productId=${productId}`;
    const response = await axios.get(`${BASE_URL}/products/details${query}`);

    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};

