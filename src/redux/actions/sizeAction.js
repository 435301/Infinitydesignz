import axios from 'axios';

// Action types
export const FETCH_SIZE_DATA_REQUEST = 'FETCH_SIZE_DATA_REQUEST';
export const FETCH_SIZE_DATA_SUCCESS = 'FETCH_SIZE_DATA_SUCCESS';
export const FETCH_SIZE_DATA_FAILURE = 'FETCH_SIZE_DATA_FAILURE';

export const SET_SEARCH = 'SET_SEARCH';
export const SET_STATUS_FILTER = 'SET_STATUS_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';

export const DELETE_SIZE_MAPPING_REQUEST = 'DELETE_SIZE_MAPPING_REQUEST';
export const DELETE_SIZE_MAPPING_SUCCESS = 'DELETE_SIZE_MAPPING_SUCCESS';
export const DELETE_SIZE_MAPPING_FAILURE = 'DELETE_SIZE_MAPPING_FAILURE';

export const ADD_SIZE_MAPPING_REQUEST = 'ADD_SIZE_MAPPING_REQUEST';
export const ADD_SIZE_MAPPING_SUCCESS = 'ADD_SIZE_MAPPING_SUCCESS';
export const ADD_SIZE_MAPPING_FAILURE = 'ADD_SIZE_MAPPING_FAILURE';

export const UPDATE_SIZE_MAPPING_REQUEST = 'UPDATE_SIZE_MAPPING_REQUEST';
export const UPDATE_SIZE_MAPPING_SUCCESS = 'UPDATE_SIZE_MAPPING_SUCCESS';
export const UPDATE_SIZE_MAPPING_FAILURE = 'UPDATE_SIZE_MAPPING_FAILURE';

// Action creators
export const fetchSizeDataRequest = () => ({ type: FETCH_SIZE_DATA_REQUEST });
export const fetchSizeDataSuccess = (data) => ({ type: FETCH_SIZE_DATA_SUCCESS, payload: data });
export const fetchSizeDataFailure = (error) => ({ type: FETCH_SIZE_DATA_FAILURE, payload: error });

export const setSearch = (search) => ({ type: SET_SEARCH, payload: search });
export const setStatusFilter = (status) => ({ type: SET_STATUS_FILTER, payload: status });
export const resetFilters = () => ({ type: RESET_FILTERS });

const API_URL = 'http://68.183.89.229:4005/size-uom';

// ✅ FETCH SIZE DATA
export const fetchSizeData = () => {
  return async (dispatch) => {
    dispatch(fetchSizeDataRequest());
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(fetchSizeDataFailure('No authentication token found.'));
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(fetchSizeDataSuccess(response.data));
    } catch (error) {
      console.error('Fetch size data error:', error);
      dispatch(fetchSizeDataFailure(error.response?.data?.message || error.message));
    }
  };
};

// ✅ DELETE SIZE MAPPING
export const deleteSizeMapping = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_SIZE_MAPPING_REQUEST });
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch({ type: DELETE_SIZE_MAPPING_FAILURE, payload: 'No authentication token found.' });
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: DELETE_SIZE_MAPPING_SUCCESS, payload: id });
    } catch (error) {
      console.error('Delete size mapping error:', error);
      dispatch({
        type: DELETE_SIZE_MAPPING_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

// ✅ ADD SIZE MAPPING
export const addSizeMapping = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SIZE_MAPPING_REQUEST });
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch({ type: ADD_SIZE_MAPPING_FAILURE, payload: 'No authentication token found.' });
      return;
    }

    try {
      await axios.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: ADD_SIZE_MAPPING_SUCCESS });
    } catch (error) {
      console.error('Add size mapping error:', error);
      dispatch({
        type: ADD_SIZE_MAPPING_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

// ✅ UPDATE SIZE MAPPING
export const updateSizeMapping = (id, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_SIZE_MAPPING_REQUEST });
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch({ type: UPDATE_SIZE_MAPPING_FAILURE, payload: 'No authentication token found.' });
      return { error: true, message: 'No authentication token found.' };
    }

    try {
      const response = await axios.patch(`${API_URL}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: UPDATE_SIZE_MAPPING_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      console.error('Update size mapping error:', error);
      dispatch({
        type: UPDATE_SIZE_MAPPING_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
      return { error: true, message: error.response?.data?.message || error.message };
    }
  };
};
