import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ADMINORDERS_REQUEST,
  FETCH_ADMINORDERS_SUCCESS,
  FETCH_ADMINORDERS_FAILURE,
  FETCH_ORDER_BY_ID_REQUEST,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ORDER_BY_ID_FAILURE,
} from '../actions/orderAction';

const initialState = {
  loading: false,
  order: null,
  orderById: null,
  adminOrder: [],
  error: null,
  pagination: {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case PLACE_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case PLACE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case FETCH_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_ADMINORDERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ADMINORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminOrder: action.payload.data,
        pagination: action.payload.pagination,
      };
    case FETCH_ADMINORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderById: action.payload,
      };
    case FETCH_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
