import {
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
  FETCH_BRAND_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAILURE,
  EDIT_BRAND_REQUEST,
  EDIT_BRAND_SUCCESS,
  EDIT_BRAND_FAILURE,
  DELETE_BRAND_SUCCESS,
  BULK_UPDATE_BRAND_SUCCESS
} from '../actions/brandAction';

const initialState = {
  loading: false,
  brands: [],
  error: null,

};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRAND_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BRAND_SUCCESS:
      return { ...state, loading: false, brands: action.payload };
    case FETCH_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_BRAND_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_BRAND_SUCCESS:
      return { ...state, loading: false, brands: action.payload };
    case ADD_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_BRAND_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_BRAND_SUCCESS:
      return { ...state, loading: false };
    case EDIT_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };
       case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        brands: state.brands.filter((item) => item.id !== action.payload),
      };
    case BULK_UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        brands: state.brands.map((brand) =>
          action.payload.find((b) => b.id === brand.id) ? { ...brand, ...action.payload.find((b) => b.id === brand.id) } : brand
        ),
      };
    default:
      return state;
  }
};

export default brandReducer;