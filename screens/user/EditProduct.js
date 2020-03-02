import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import * as prodActions from "../../store/actions/products";

const EditProduct = props => {
  const dispatch = useDispatch();
  const prodId = props.navigation.getParam("prodId");
  const products = useSelector(state => state.products.userProducts);
  const prod = products.find(product => product.id === prodId);

  const [title, setTitle] = useState(prod ? prod.title : "");
  const [imageUrl, setImageUrl] = useState(prod ? prod.imageUrl : "");
  const [price, setPrice] = useState(prod ? prod.price : "");
  const [description, setDescription] = useState(prod ? prod.description : "");

  const submitHandler = useCallback(() => {
    if (prod) {
      dispatch(prodActions.updateProduct(prodId, title, imageUrl, description));
    } else {
      dispatch(prodActions.createProduct(title, imageUrl, +price, description));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
        </View>
        {!prodId && (
          <View style={styles.formItem}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
          </View>
        )}
        <View style={styles.formItem}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
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
