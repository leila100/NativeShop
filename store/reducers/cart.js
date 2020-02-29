import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/Cart-item";

const initialState = {
  items: {},
  total: 0
};

export default cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.item;
      const { id, price, title } = item;
      let newItem;
      if (state.items[id]) {
        newItem = new CartItem(state.items[id].quantity + 1, price, title, state.items[id].sum + price);
      } else {
        newItem = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [id]: newItem },
        total: state.total + price
      };

    case DELETE_FROM_CART:
      const itemId = action.itemId;
      if (state.items[itemId]) {
        let updatedItems = {};
        const { quantity, productPrice, productTitle, sum } = state.items[itemId];
        if (state.items[itemId].quantity > 1) {
          const updatedItem = new CartItem(quantity - 1, productPrice, productTitle, sum - productPrice);
          updatedItems = { ...state.items, [itemId]: updatedItem };
        } else if (state.items[itemId].quantity === 1) {
          updatedItems = { ...state.items };
          delete updatedItems[itemId];
        }
        return {
          ...state,
          items: updatedItems,
          total: state.total - productPrice
        };
      }

    case ADD_ORDER:
      return initialState;

    default:
      return state;
  }
};
