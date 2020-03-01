import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";

const EditProduct = props => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const prodId = props.navigation.getParam("prodId");
  const products = useSelector(state => state.products.userProducts);

  useEffect(() => {
    if (prodId) {
      const prod = products.find(product => product.id === prodId);
      setTitle(prod.title);
      setImageUrl(prod.imageUrl);
      setDescription(prod.description);
    }
  }, [prodId]);

  const submitHandler = useCallback(() => {
    console.log("Submitting!!!");
  }, []);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChange={text => setTitle(text)} />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChange={text => setImageUrl(text)} />
        </View>
        {!prodId && (
          <View style={styles.formItem}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChange={text => setPrice(text)} />
          </View>
        )}
        <View style={styles.formItem}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChange={text => setDescription(text)} />
        </View>
      </View>
    </ScrollView>
  );
};

EditProduct.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("prodId") ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Save' iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"} onPress={submitFn} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formItem: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default EditProduct;
