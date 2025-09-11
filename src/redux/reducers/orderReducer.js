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
  CANCEL_ORDER_ITEM_REQUEST,
  CANCEL_ORDER_ITEM_SUCCESS,
  CANCEL_ORDER_ITEM_FAILURE,
  CANCEL_ADMINORDER_ITEM_REQUEST,
  CANCEL_ADMINORDER_ITEM_SUCCESS,
  CANCEL_ADMINORDER_ITEM_FAILURE,
} from '../actions/orderAction';

const initialState = {
  loading: false,
  order: null,
  orderById: null,
  orders: [],
  adminOrder: [],
  relatedProducts: [],
  error: null,
  pagination: {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
  success: false,
  cancelSuccess: false,
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
      return { ...state, loading: false, orders: action.payload.orders, relatedProducts: action.payload.relatedProducts || []  };
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
        pagination: action.payload.pagination,
      };
    case FETCH_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CANCEL_ORDER_ITEM_REQUEST:
      return { ...state, loading: true, cancelSuccess: false };

    case CANCEL_ORDER_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cancelSuccess: true,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? {
              ...order,
              items: order.items.map((item) =>
                item.id === action.payload.id ? action.payload : item
              ),
            }
            : order
        ),
      };

    case CANCEL_ORDER_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload, cancelSuccess: false };
       case CANCEL_ORDER_ITEM_REQUEST:
      return {...state, loading: true, error: null, };

    case CANCEL_ORDER_ITEM_SUCCESS:
       const updatedItem = action.payload;
      return {
    ...state,
    orderById: {
      ...state.orderById,
      orderItems: state.orderById.orderItems.map(item =>
        item.id === updatedItem.id ? { ...item, status: updatedItem.status } : item
      ),
    },
  };

    case CANCEL_ORDER_ITEM_FAILURE:
      return { ...state, loading: false,error: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
