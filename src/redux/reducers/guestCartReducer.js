// guestCartReducer.js
import {
  ADD_TO_GUEST_CART,
  UPDATE_GUEST_CART,
  DELETE_FROM_GUEST_CART,
  CLEAR_GUEST_CART,
} from "../actions/guestCartAction";

const initialState = {
  items: [],
};

export const guestCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_GUEST_CART:
    case UPDATE_GUEST_CART:
    case DELETE_FROM_GUEST_CART:
      return { ...state, items: action.payload };
    case CLEAR_GUEST_CART:
      localStorage.removeItem("guestCart");
      return { ...state, items: [] };
    default:
      return state;
  }
};