import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductCard from "../../components/shop/ProductCard";

const Products = () => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <ProductCard prod={itemData.item} onViewDetail={() => {}} onAddToCart={() => {}} />}
    />
  );
};

const styles = StyleSheet.create({});

export default Products;
