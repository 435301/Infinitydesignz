import {
  FETCH_FEATURELIST_REQUEST,
  FETCH_FEATURELIST_SUCCESS,
  FETCH_FEATURELIST_FAILURE,
  ADD_FEATURELIST_REQUEST,
  ADD_FEATURELIST_SUCCESS,
  ADD_FEATURELIST_FAILURE,
  EDIT_FEATURELIST_REQUEST,
  EDIT_FEATURELIST_SUCCESS,
  EDIT_FEATURELIST_FAILURE,
    DELETE_FEATURELIST_SUCCESS,
} from '../actions/featureListAction';

const initialState = {
  loading: false,
  featureLists: [],
  error: null,

};

const featureListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEATURELIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FEATURELIST_SUCCESS:
      return { ...state, loading: false, featureLists: action.payload };
    case FETCH_FEATURELIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FEATURELIST_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FEATURELIST_SUCCESS:
      return {
        ...state,
        featureLists: [...state.featureLists, action.payload],
      };
    case ADD_FEATURELIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_FEATURELIST_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_FEATURELIST_SUCCESS:
      return {
        ...state,
        featureLists: [...state.featureLists, action.payload],
      };
    case EDIT_FEATURELIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_FEATURELIST_SUCCESS:
      return {
        ...state,
        featureLists: state.featureLists.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default featureListsReducer;