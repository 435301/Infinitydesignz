import {
  FETCH_FILTERSET_REQUEST,
  FETCH_FILTERSET_SUCCESS,
  FETCH_FILTERSET_FAILURE,
  ADD_FILTERSET_REQUEST,
  ADD_FILTERSET_SUCCESS,
  ADD_FILTERSET_FAILURE,
  EDIT_FILTERSET_REQUEST,
  EDIT_FILTERSET_SUCCESS,
  EDIT_FILTERSET_FAILURE,
    DELETE_FILTERSET_SUCCESS,
} from '../actions/filterSetAction';

const initialState = {
  loading: false,
  filterSets: [],
  error: null,

};

const filterSetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILTERSET_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FILTERSET_SUCCESS:
      return { ...state, loading: false, filterSets: action.payload };
    case FETCH_FILTERSET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FILTERSET_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FILTERSET_SUCCESS:
      return {
        ...state,
        filterSets: [...state.filterSets, action.payload],
      };
    case ADD_FILTERSET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_FILTERSET_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_FILTERSET_SUCCESS:
      return {
        ...state,
        filterSets: [...state.filterSets, action.payload],
      };
    case EDIT_FILTERSET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_FILTERSET_SUCCESS:
      return {
        ...state,
        filterSets: state.filterSets.filter((item) => item.id !== action.payload),
      };
    

    default:
      return state;
  }
};

export default filterSetReducer;