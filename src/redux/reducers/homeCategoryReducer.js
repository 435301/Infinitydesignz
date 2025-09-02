
import {
  FETCH_HOME_TABS_REQUEST,
  FETCH_HOME_TABS_SUCCESS,
  FETCH_HOME_TABS_FAILURE,
} from "../actions/homeCategoryAction";

const initialState = {
  loading: false,
  homeTabs: [],
  error: null,
};

const homeCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_TABS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_HOME_TABS_SUCCESS:
      return { ...state, loading: false, homeTabs: action.payload };
    case FETCH_HOME_TABS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default homeCategoryReducer;
