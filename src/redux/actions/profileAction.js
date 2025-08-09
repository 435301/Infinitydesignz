
import axios from "axios";
import { getToken } from "../../utils/auth"; 
import BASE_URL from "../../config/config";

export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";


export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const res = await axios.get(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const res = await axios.put(`${BASE_URL}/user/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: err.response?.data?.message || err.message,
    });
  }
};
