import {
  FETCH_SIZE_REQUEST,
  FETCH_SIZE_SUCCESS,
  FETCH_SIZE_FAILURE,
  ADD_SIZES_REQUEST,
  ADD_SIZES_SUCCESS,
  ADD_SIZES_FAILURE,
  EDIT_SIZES_REQUEST,
  EDIT_SIZES_SUCCESS,
  EDIT_SIZES_FAILURE
} from '../actions/sizeAction';

const initialState = {
  loading: false,
  sizes: [],
  error: null,

};

const sizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SIZE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SIZE_SUCCESS:
      return { ...state, loading: false, sizes: action.payload };
    case FETCH_SIZE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_SIZES_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_SIZES_SUCCESS:
      return { ...state, loading: false, sizes: action.payload };
    case ADD_SIZES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_SIZES_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_SIZES_SUCCESS:
      return { ...state, loading: false };
    case EDIT_SIZES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sizeReducer;