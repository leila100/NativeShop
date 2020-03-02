export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = prodId => {
  return { type: DELETE_PRODUCT, prodId: prodId };
};

export const createProduct = (title, imageUrl, price, description) => {
  return { type: CREATE_PRODUCT, prod: { title, imageUrl, price, description } };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return { type: UPDATE_PRODUCT, prod: { title, imageUrl, description }, prodId: id };
};
