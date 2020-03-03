import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";

import Product from "../../models/Product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(prod => prod.id !== action.prodId),
        userProducts: state.userProducts.filter(prod => prod.id !== action.prodId)
      };

    case CREATE_PRODUCT:
      var { id, title, imageUrl, description, price } = action.prod;
      const newProd = new Product(id, "u1", title, imageUrl, description, price);
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProd],
        userProducts: [...state.userProducts, newProd]
      };

    case UPDATE_PRODUCT:
      const prodId = action.prodId;
      var { title, imageUrl, description } = action.prod;
      let prodIndex = state.userProducts.findIndex(prod => prod.id === prodId);
      const oldProd = state.userProducts[prodIndex];
      const updatedProd = new Product(prodId, oldProd.ownerId, title, imageUrl, description, oldProd.price);
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[prodIndex] = updatedProd;
      prodIndex = state.availableProducts.findIndex(prod => prod.id === prodId);
      const updatedAvailableProds = [...state.availableProducts];
      updatedAvailableProds[prodIndex] = updatedProd;
      return {
        ...state,
        availableProducts: updatedAvailableProds,
        userProducts: updatedUserProducts
      };

    default:
      return state;
  }
};
