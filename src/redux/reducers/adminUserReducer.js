import {
  FETCH_ADMIN_USERS_REQUEST,
  FETCH_ADMIN_USERS_SUCCESS,
  FETCH_ADMIN_USERS_FAIL,
  CREATE_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_USER_SUCCESS,
  DELETE_ADMIN_USER_SUCCESS,
} from "../actions/adminUsersAction";

const initialState = {
  users: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  totalPages: 1,
};

export const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.items,
        total: action.payload.total,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case FETCH_ADMIN_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_ADMIN_USER_SUCCESS:
      return { ...state, users: [action.payload, ...state.users] };
    case UPDATE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.payload.id ? action.payload : u)),
      };
    case DELETE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    default:
      return state;
  }
};
