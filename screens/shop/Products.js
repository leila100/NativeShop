import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../../components/shop/ProductCard";
import * as cartActions from "../../store/actions/cart";

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

const styles = StyleSheet.create({});

export default Products;
