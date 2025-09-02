import BASE_URL from "../../config/config";
import axios from "axios";

export const FETCH_HOME_TABS_REQUEST = "FETCH_HOME_TABS_REQUEST";
export const FETCH_HOME_TABS_SUCCESS = "FETCH_HOME_TABS_SUCCESS";
export const FETCH_HOME_TABS_FAILURE = "FETCH_HOME_TABS_FAILURE";

export const fetchHomeTabs =  () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_HOME_TABS_REQUEST });
    try {
      const response = await axios.get(`${BASE_URL}/categories/home-tabs`);
       dispatch({
        type: FETCH_HOME_TABS_SUCCESS,
        payload: response.data, 
      });
    } catch (error) {
       dispatch({
        type: FETCH_HOME_TABS_FAILURE,
        payload: error.message || "Something went wrong",
      });
    }
  };
};