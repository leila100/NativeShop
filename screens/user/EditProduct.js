import React, { useEffect, useCallback, useReducer } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Platform, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import * as prodActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updateFormIsValid = true;
    for (let key in updatedValidities) {
      updateFormIsValid = updateFormIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updateFormIsValid
    };
  }
  return state;
};

const EditProduct = props => {
  const dispatch = useDispatch();

  const prodId = props.navigation.getParam("prodId");
  const products = useSelector(state => state.products.userProducts);
  const prod = products.find(product => product.id === prodId);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: prod ? prod.title : "",
      imageUrl: prod ? prod.imageUrl : "",
      price: "",
      description: prod ? prod.description : ""
    },
    inputValidities: {
      title: prod ? true : false,
      imageUrl: prod ? true : false,
      price: prod ? true : false,
      description: prod ? true : false
    },
    formIsValid: prod ? true : false
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors in the form.", [{ text: "OK" }]);
      return;
    }

    if (prod) {
      dispatch(
        prodActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        prodActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
          formState.inputValues.description
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) isValid = true;
    dispatchFormState({ type: FORM_INPUT_UPDATE, value: text, isValid: isValid, input: inputIdentifier });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={text => textChangeHandler("title", text)}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
          />
          {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
        </View>
        <View style={styles.formItem}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={text => textChangeHandler("imageUrl", text)}
          />
        </View>
        {!prodId && (
          <View style={styles.formItem}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={text => textChangeHandler("price", text)}
              keyboardType='decimal-pad'
            />
          </View>
        )}
        <View style={styles.formItem}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={text => textChangeHandler("description", text)}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
          />
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
