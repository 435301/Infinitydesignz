
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE
} from '../actions/userProductDetailsAction';

const initialState = {
  loading: false,
  product: null,
  error: null,
};

 const userProductDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, error: null };
    case FETCH_PRODUCT_FAILURE:
      return { loading: false, product: null, error: action.payload };
    default:
      return state;
  }
};

export default userProductDetailsReducer
