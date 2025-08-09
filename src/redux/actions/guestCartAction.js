  // cartAction.js

import { toast } from "react-toastify";

// Guest Cart Actions
export const ADD_TO_GUEST_CART = "ADD_TO_GUEST_CART";
export const UPDATE_GUEST_CART = "UPDATE_GUEST_CART";
export const DELETE_FROM_GUEST_CART = "DELETE_FROM_GUEST_CART";
export const CLEAR_GUEST_CART = 'CLEAR_GUEST_CART';

// Add item to guest cart
export const addToGuestCart = (cartItem) => (dispatch) => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || { items: [] };

  const existingItemIndex = guestCart.items.findIndex(
    (item) =>
      item.productId === cartItem.productId &&
      item.variantId === cartItem.variantId
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    guestCart.items[existingItemIndex].quantity += cartItem.quantity || 1;
  } else {
    // Add new item
    guestCart.items.push({
      productId: cartItem.productId,
      variantId: cartItem.variantId || null,
      quantity: cartItem.quantity || 1,
      sizeId: cartItem.sizeId || null,
    });
  }

  localStorage.setItem("guestCart", JSON.stringify(guestCart));
  dispatch({ type: ADD_TO_GUEST_CART, payload: guestCart.items });
  toast.success("Added to guest cart successfully");
};

// Update item in guest cart
export const updateGuestCart = (id, updatedItem) => (dispatch) => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || { items: [] };
  const itemIndex = guestCart.items.findIndex(
    (item) =>
      item.productId === updatedItem.productId &&
      item.variantId === updatedItem.variantId
  );

  if (itemIndex >= 0) {
    guestCart.items[itemIndex] = { ...guestCart.items[itemIndex], ...updatedItem };
    localStorage.setItem("guestCart", JSON.stringify(guestCart));
    dispatch({ type: UPDATE_GUEST_CART, payload: guestCart.items });
    toast.success("Guest cart updated successfully");
  }
};

// Delete item from guest cart
export const deleteFromGuestCart = (productId, variantId) => (dispatch) => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || { items: [] };
  guestCart.items = guestCart.items.filter(
    (item) =>
      !(item.productId === productId && item.variantId === variantId)
  );
  localStorage.setItem("guestCart", JSON.stringify(guestCart));
  dispatch({ type: DELETE_FROM_GUEST_CART, payload: guestCart.items });
  toast.success("Removed from guest cart successfully");
};

// Initialize guest cart from localStorage on app load
export const initializeGuestCart = () => (dispatch) => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || { items: [] };
  dispatch({ type: ADD_TO_GUEST_CART, payload: guestCart.items });
};