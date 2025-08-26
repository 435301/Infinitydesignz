import axios from "axios";
import BASE_URL from "../../config/config";
import { getAdminToken } from "../../utils/adminAuth";
import { toast } from "react-toastify";

export const FETCH_ADMIN_USERS_REQUEST = "FETCH_ADMIN_USERS_REQUEST";
export const FETCH_ADMIN_USERS_SUCCESS = "FETCH_ADMIN_USERS_SUCCESS";
export const FETCH_ADMIN_USERS_FAIL = "FETCH_ADMIN_USERS_FAIL";

export const CREATE_ADMIN_USER_SUCCESS = "CREATE_ADMIN_USER_SUCCESS";
export const UPDATE_ADMIN_USER_SUCCESS = "UPDATE_ADMIN_USER_SUCCESS";
export const DELETE_ADMIN_USER_SUCCESS = "DELETE_ADMIN_USER_SUCCESS";

export const fetchAdminUsers = (params = { page: 1, take: 10 }) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ADMIN_USERS_REQUEST });

    const response = await axios.get(`${BASE_URL}/admin/users`, {
      params,
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });

    dispatch({ type: FETCH_ADMIN_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_ADMIN_USERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createAdminUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/users`, userData, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: CREATE_ADMIN_USER_SUCCESS, payload: response.data });
    dispatch(fetchAdminUsers());
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message || 'error creating user')
  }
};

export const updateAdminUser = (id, userData) => async (dispatch) => {
  try {
    const response = await axios.patch(`${BASE_URL}/admin/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: UPDATE_ADMIN_USER_SUCCESS, payload: response.data });
    dispatch(fetchAdminUsers());
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message || 'error updating user')
  }
};


export const deleteAdminUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    dispatch({ type: DELETE_ADMIN_USER_SUCCESS, payload: id });
    dispatch(fetchAdminUsers());
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message || 'error deleting user')
  }
};

export const bulkUpdateAdminUserStatus = (ids,status) => async (dispatch) => {
  try {
    await axios.patch(
      `${BASE_URL}/common/bulk-update-status`,
      {
        entity: 'admin-users', 
        ids,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }
    );
    dispatch(fetchAdminUsers()); 
  } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update user status');
    console.error(error);
    toast.error(error.response?.message || 'Failed to update user status.');
  }
};