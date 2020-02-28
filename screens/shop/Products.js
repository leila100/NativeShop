import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductCard from "../../components/shop/ProductCard";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";

const Products = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductCard
          prod={itemData.item}
          onViewDetail={() => {
            props.navigation.navigate("Product", { productId: itemData.item.id, productTitle: itemData.item.title });
          }}
          onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
        />
      )}
    />
  );
};

Products.navigationOptions = navData => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    )
  };
};

export default Products;
