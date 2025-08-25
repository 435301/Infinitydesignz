import axios from "axios";
import BASE_URL from "../../config/config";
import { getAdminToken } from "../../utils/adminAuth";
import { toast } from "react-toastify";

export const SUBSCRIBERS_REQUEST = "SUBSCRIBERS_REQUEST";
export const SUBSCRIBERS_SUCCESS = "SUBSCRIBERS_SUCCESS";
export const SUBSCRIBERS_FAILURE = "SUBSCRIBERS_FAILURE";

export const fetchSubscribers =
  ({ page = 1, take = 10 }) =>
  async (dispatch) => {
    dispatch({type:SUBSCRIBERS_REQUEST});
    try {
      const res = await axios.get(
        `${BASE_URL}/user-subscribe?page=${page}&take=${take}`,
      {
           headers: { Authorization: `Bearer ${getAdminToken()}` },
         } );
      dispatch({type:SUBSCRIBERS_SUCCESS,payload:res.data});
    } catch (err) {
      dispatch({type:SUBSCRIBERS_FAILURE,payload:err.response?.data?.message || err.message});
    }
  };

  export const deleteSubscriber = (email) => async (dispatch) => {
  try {

   const response =  await axios.delete(`${BASE_URL}/user-subscribe`, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
       data: { email },
    }
);
    dispatch(fetchSubscribers({ page: 1, take: 10, search: "" })); 
    toast.success(response.data.message || 'subscriber deleted successfully.');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete subscriber.');
    console.error(error);
  }
};