import axios from "axios";
import BASE_URL from "../../config/config";
import { getAdminToken } from "../../utils/adminAuth";
import { toast } from "react-toastify";

export const SEARCH_KEYWORDS_REQUEST = "SEARCH_KEYWORDS_REQUEST";
export const SEARCH_KEYWORDS_SUCCESS = "SEARCH_KEYWORDS_SUCCESS";
export const SEARCH_KEYWORDS_FAILURE = "SEARCH_KEYWORDS_FAILURE";

export const fetchKeywords =
  ({ page = 1, take = 10, search = "", userId = "" }) =>
  async (dispatch) => {
    dispatch({type:SEARCH_KEYWORDS_REQUEST});
    try {
      const res = await axios.get(
        `${BASE_URL}/keywords?page=${page}&take=${take}&search=${search}&userId=${userId}`,
      {
           headers: { Authorization: `Bearer ${getAdminToken()}` },
         } );
      dispatch({type:SEARCH_KEYWORDS_SUCCESS,payload:res.data});
    } catch (err) {
      dispatch({type:SEARCH_KEYWORDS_FAILURE,payload:err.response?.data?.message || err.message});
    }
  };

  export const deleteKeyword = (id) => async (dispatch) => {
  try {

   const response =  await axios.delete(`${BASE_URL}/keywords/${id}`, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch(fetchKeywords({ page: 1, take: 10, search: "" })); 
    toast.success(response.data.message || 'keyword deleted successfully.');
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete keyword.');
    console.error(error);
  }
};