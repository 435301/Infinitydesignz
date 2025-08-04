import { ADD_TO_GUEST_CART } from "../actions/guestCartAction";


const initialState = {
  items: JSON.parse(localStorage.getItem('guest_cart')) || [],
};

export const guestCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_GUEST_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};
