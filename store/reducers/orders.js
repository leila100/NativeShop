import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/Order";

const initialState = {
  orders: []
};

export default ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(action.order.id, action.order.items, action.order.total, action.order.date);
      return {
        ...state,
        orders: [...state.orders, newOrder]
      };

    default:
      return state;
  }
};
