import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_FEATURES_SUCCESS,
  FETCH_PRODUCT_FEATURES_REQUEST,
  FETCH_PRODUCT_FEATURES_FAILURE,
  ADD_PRODUCT_FEATURES_REQUEST,
  ADD_PRODUCT_FEATURES_SUCCESS,
  ADD_PRODUCT_FEATURES_FAILURE,
  EDIT_PRODUCT_FEATURES_REQUEST,
  EDIT_PRODUCT_FEATURES_SUCCESS,
  EDIT_PRODUCT_FEATURES_FAILURE,
  DELETE_PRODUCT_FEATURE_SUCCESS,
  FETCH_PRODUCT_FILTERS_SUCCESS,
  FETCH_PRODUCT_FILTERS_REQUEST,
  FETCH_PRODUCT_FILTERS_FAILURE,
  ADD_PRODUCT_FILTERS_REQUEST,
  ADD_PRODUCT_FILTERS_SUCCESS,
  ADD_PRODUCT_FILTERS_FAILURE,
  EDIT_PRODUCT_FILTERS_REQUEST,
  EDIT_PRODUCT_FILTERS_SUCCESS,
  EDIT_PRODUCT_FILTERS_FAILURE,
  DELETE_PRODUCT_FILTERS_SUCCESS
} from '../actions/productAction';

const initialState = {
  loading: false,
  products: [],
  productFeatures: [],
  productFilters: [],
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case ADD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case EDIT_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };
    case 'BULK_UPDATE_PRODUCT_STATUS':
      return {
        ...state,
        products: state.products.map(item =>
          action.payload.ids.includes(item.id)
            ? { ...item, status: action.payload.status }
            : item
        )
      };
    case FETCH_PRODUCT_FEATURES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_FEATURES_SUCCESS:
      return { ...state, loading: false, productFeatures: action.payload };
    case FETCH_PRODUCT_FEATURES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT_FEATURES_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_PRODUCT_FEATURES_SUCCESS:
      return { ...state, loading: false, productFeatures: action.payload };
    case ADD_PRODUCT_FEATURES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_PRODUCT_FEATURES_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_PRODUCT_FEATURES_SUCCESS:
      return { ...state, loading: false };
    case EDIT_PRODUCT_FEATURES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_FEATURE_SUCCESS:
      return {
        ...state,
        productFeatures: state.productFeatures.filter((item) => item.id !== action.payload),
      };

    case FETCH_PRODUCT_FILTERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_FILTERS_SUCCESS:
      return { ...state, loading: false, productFilters: action.payload };
    case FETCH_PRODUCT_FILTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT_FILTERS_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_PRODUCT_FILTERS_SUCCESS:
      return { ...state, loading: false, productFilters: action.payload };
    case ADD_PRODUCT_FILTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case EDIT_PRODUCT_FILTERS_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_PRODUCT_FILTERS_SUCCESS:
      return { ...state, loading: false };
    case EDIT_PRODUCT_FILTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PRODUCT_FILTERS_SUCCESS:
      return {
        ...state,
        productFilters: state.productFilters.filter((item) => item.id !== action.payload),
      };


    default:
      return state;
  }
};

export default productReducer;