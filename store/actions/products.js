import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch("https://native-shop-api.firebaseio.com/products.json");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const products = [];
      for (let key in resData) {
        const { description, imageUrl, price, title, ownerId } = resData[key];
        products.push(new Product(key, ownerId, title, imageUrl, description, price));
      }

      dispatch({
        type: SET_PRODUCTS,
        products: products,
        userProducts: products.filter(prod => prod.ownerId === userId)
      });
    } catch (error) {
      // add to error logs
      throw error;
    }
  };
};

export const deleteProduct = prodId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`https://native-shop-api.firebaseio.com/products/${prodId}.json?auth=${token}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, prodId: prodId });
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`https://native-shop-api.firebaseio.com/products.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, imageUrl, price, description, ownerId: userId })
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      prod: { id: resData.name, title, imageUrl, price, description, ownerId: userId }
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`https://native-shop-api.firebaseio.com/products/${id}.json?auth=${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, imageUrl, description })
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({ type: UPDATE_PRODUCT, prod: { title, imageUrl, description }, prodId: id });
    } catch (error) {
      // add to error logs
      throw error;
    }
  };
};
