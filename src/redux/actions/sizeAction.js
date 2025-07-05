import axios from "axios";
import { toast } from 'react-toastify';
import BASE_URL from "../../config/config";

export const FETCH_SIZE_REQUEST = 'FETCH_SIZE_REQUEST';
export const FETCH_SIZE_SUCCESS = 'FETCH_SIZE_SUCCESS';
export const FETCH_SIZE_FAILURE = 'FETCH_SIZE_FAILURE';

export const fetchSizes = () => {

  return async (dispatch) => {

    dispatch({ type: FETCH_SIZE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('token', token)

      const response = await axios.get(`${BASE_URL}/size-uom`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response', response)
      dispatch({ type: FETCH_SIZE_SUCCESS, payload: response.data });
      //  toast.dismiss(loadingToastId);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to fetch sizes');
      dispatch({
        type: FETCH_SIZE_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};