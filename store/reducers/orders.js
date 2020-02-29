import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/Order";

const initialState = {
  orders: []
};

export default ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(new Date().toString(), action.order.items, action.order.total, new Date());
      return {
        ...state,
        orders: [...state.orders, newOrder]
      };

    default:
      return state;
  }
};
