import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    />
  );
};

const styles = StyleSheet.create({});

export default Products;
