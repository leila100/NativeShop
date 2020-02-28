import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductCard from "../../components/shop/ProductCard";

const Products = props => {
  const products = useSelector(state => state.products.availableProducts);
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
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default Products;
