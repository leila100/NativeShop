import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EditProduct = props => {
  const prodId = props.navigation.getParam("prodId");
  return (
    <View>{prodId ? <Text>The edit product screen for product {prodId}</Text> : <Text>Add new Product</Text>}</View>
  );
};

const styles = StyleSheet.create({});

export default EditProduct;
