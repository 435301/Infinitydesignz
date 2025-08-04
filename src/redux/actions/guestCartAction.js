import { toast } from "react-toastify";

export const ADD_TO_GUEST_CART = "ADD_TO_GUEST_CART";

export const addToGuestCart = (item) => (dispatch, getState) => {
  const existingCart = getState().guestCart.items;
  const updatedCart = [...existingCart, item];

  // Save to localStorage
  localStorage.removeItem("access_token");
  localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
  toast.success("Added to cart successfully");
  dispatch({
    type: ADD_TO_GUEST_CART,
    payload: item,
  });
};
