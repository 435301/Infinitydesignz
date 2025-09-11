
import axios from 'axios';
import BASE_URL from '../../config/config';
import { getAdminToken } from '../../utils/adminAuth';
import { toast } from 'react-toastify';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";


export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
      });

      console.log('response', response)
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      window.location.href = '/admin/dashboard';

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Invalid Credentials')
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid Credentials' });
    }
  };
};

export const changePassword = (email, oldPassword, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {
      const response = await axios.patch(`${BASE_URL}/auth/change-password`, {
        email,
        oldPassword,
        newPassword,
      },{
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });

      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response.data, 
      });
      toast.success(response.data?.message || "Password changed successfully ")
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        payload: error.response?.data?.message || "Password change failed",
      });
      toast.error(error?.response?.data?.message || "Password change failed")
    }
  };
};


