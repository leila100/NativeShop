import { ADD_TO_CART } from "../actions/cart";
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
    default:
      return state;
  }
};
