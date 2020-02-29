export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";

export const addToCart = item => {
  return { type: ADD_TO_CART, item: item };
};

export const deleteFromCart = itemId => {
  return { type: DELETE_FROM_CART, itemId: itemId };
};
