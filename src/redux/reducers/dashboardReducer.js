import {
  FETCH_DASHBOARD_REQUEST,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAIL,
} from "../actions/dashboardAction";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DASHBOARD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_DASHBOARD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};