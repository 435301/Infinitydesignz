// src/redux/reducers/authReducer.js
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from '../actions/authAction';

const initialState = {
  loading: false,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
