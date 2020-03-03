import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch("https://native-shop-api.firebaseio.com/products.json");

    const resData = await response.json();
    const products = [];
    for (let key in resData) {
      const { description, imageUrl, price, title } = resData[key];
      products.push(new Product(key, "u1", title, imageUrl, description, price));
    }

    dispatch({ type: SET_PRODUCTS, products: products });
  };
};

export const deleteProduct = prodId => {
  return { type: DELETE_PRODUCT, prodId: prodId };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async dispatch => {
    const response = await fetch("https://native-shop-api.firebaseio.com/products.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, imageUrl, price, description })
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({ type: CREATE_PRODUCT, prod: { id: resData.name, title, imageUrl, price, description } });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return { type: UPDATE_PRODUCT, prod: { title, imageUrl, description }, prodId: id };
};
