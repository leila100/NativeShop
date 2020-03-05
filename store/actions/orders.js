import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`https://native-shop-api.firebaseio.com/orders/${userId}.json`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const orders = [];
      for (let key in resData) {
        const { cartItems, totalAmount, date } = resData[key];
        orders.push(new Order(key, cartItems, totalAmount, new Date(date)));
      }

      dispatch({ type: SET_ORDERS, orders: orders });
    } catch (error) {
      // add to error logs
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(`https://native-shop-api.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cartItems, totalAmount, date: date.toISOString() })
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({ type: ADD_ORDER, order: { id: resData.name, items: cartItems, total: totalAmount, date: date } });
  };
};
