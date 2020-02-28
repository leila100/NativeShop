import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, Button, ScrollView } from "react-native";

const Product = props => {
  const prodId = props.navigation.getParam("productId");
  const selectedProd = useSelector(state => state.products.availableProducts.find(product => product.id === prodId));

  return (
    <View>
      <Text>The Product Details Screen: {selectedProd.title}</Text>
    </View>
  );
};

Product.navigationOptions = navData => {
  const title = navData.navigation.getParam("productTitle");
  return {
    headerTitle: title
  };
};

const styles = StyleSheet.create({});

export default Product;
