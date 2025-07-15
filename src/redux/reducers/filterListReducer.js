import {
  FETCH_FILTERLIST_REQUEST,
  FETCH_FILTERLIST_SUCCESS,
  FETCH_FILTERLIST_FAILURE,
  ADD_FILTERLIST_REQUEST,
  ADD_FILTERLIST_SUCCESS,
  ADD_FILTERLIST_FAILURE,
  EDIT_FILTERLIST_REQUEST,
  EDIT_FILTERLIST_SUCCESS,
  EDIT_FILTERLIST_FAILURE,
    DELETE_FILTERLIST_SUCCESS,
} from '../actions/filterListActions';

const initialState = {
  loading: false,
  filterLists: [],
  error: null,

};

const filterListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILTERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FILTERLIST_SUCCESS:
      return { ...state, loading: false, filterLists: action.payload };
    case FETCH_FILTERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FILTERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FILTERLIST_SUCCESS:
      return {
        ...state,
        filterLists: [...state.filterLists, action.payload],
      };
    case ADD_FILTERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_FILTERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_FILTERLIST_SUCCESS:
      return {
        ...state,
        filterLists: [...state.filterLists, action.payload],
      };
    case EDIT_FILTERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_FILTERLIST_SUCCESS:
      return {
        ...state,
        filterLists: state.filterLists.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default filterListsReducer;