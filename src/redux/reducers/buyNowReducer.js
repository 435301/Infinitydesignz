import {
  GET_BUY_NOW,
  SET_BUY_NOW,
  UPDATE_BUY_NOW,
  DELETE_BUY_NOW,
  APPLY_COUPON_BUY_NOW,
  BUY_NOW_ERROR,
    PLACE_ORDER_BUYNOW_REQUEST,
  PLACE_ORDER_BUYNOW_SUCCESS,
  PLACE_ORDER_BUYNOW_FAILURE,
  CLEAR_BUY_NOW,
} from "../actions/buyNowAction";

const initialState = {
  buyNow: null, 
  coupon: null,
  loading: false,
  error: null,
  priceSummary: {}
};

export const buyNowReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUY_NOW:
      return { ...state, buyNow: action.payload, loading: false };

    case SET_BUY_NOW:
      return { ...state, buyNow: action.payload, loading: false };

    case UPDATE_BUY_NOW:
      return { ...state, buyNow: { ...state.buyNow, ...action.payload }, loading: false };

    case DELETE_BUY_NOW:
      return { ...state, buyNow: null, loading: false };

  case APPLY_COUPON_BUY_NOW:
  return {
    ...state,
    coupon: action.payload.coupon,
    priceSummary: action.payload.priceSummary
  };

    case BUY_NOW_ERROR:
      return { ...state, error: action.payload, loading: false };
       case PLACE_ORDER_BUYNOW_REQUEST:
      return { ...state, loading: true, error: null };
    case PLACE_ORDER_BUYNOW_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case PLACE_ORDER_BUYNOW_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case CLEAR_BUY_NOW:
      return {
        ...state,
        items: [],
        priceSummary: {},
        coupon: null,
      };
      case "REMOVE_BUYNOW_COUPON":
      return {
        ...state,
        coupon: null,
        priceSummary: {
          ...state.priceSummary,
          couponDiscount: 0,
          finalPayable:
            (state.priceSummary.totalMRP || 0) -
            (state.priceSummary.discountOnMRP || 0) +
            (state.priceSummary.platformFee || 0) +
            (state.priceSummary.shippingFee || 0),
        },
      };
    default:
      return state;
  }
};


