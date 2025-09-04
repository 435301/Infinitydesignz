import axios from "axios";
import BASE_URL from "../../config/config";
import { getAdminToken } from "../../utils/adminAuth";

export const FETCH_DASHBOARD_REQUEST = "FETCH_DASHBOARD_REQUEST";
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS";
export const FETCH_DASHBOARD_FAIL = "FETCH_DASHBOARD_FAIL";

export const fetchDashboardSummary = (days = 30) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DASHBOARD_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/dashboard/summary?days=${days}`,{
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      });

    dispatch({
      type: FETCH_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DASHBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};