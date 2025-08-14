import {
  GET_BUY_NOW,
  SET_BUY_NOW,
  UPDATE_BUY_NOW,
  DELETE_BUY_NOW,
  APPLY_COUPON_BUY_NOW,
  BUY_NOW_ERROR,
} from "../actions/buyNowAction";

const initialState = {
  buyNow: null, // only one product for buy now flow
  coupon: null,
  loading: false,
  error: null,
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
      return { ...state, coupon: action.payload, loading: false };

    case BUY_NOW_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
