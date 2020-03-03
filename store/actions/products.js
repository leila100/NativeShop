export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

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
