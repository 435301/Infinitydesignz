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
    DELETE_PRODUCT_SUCCESS
} from '../actions/productAction';

const initialState = {
    loading: false,
    products:[],
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


    default:
      return state;
  }
};

export default productReducer;