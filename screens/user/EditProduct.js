import React, { useEffect, useCallback, useReducer } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Platform, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import * as prodActions from "../../store/actions/products";
import Input from "../../components/UI/Input";

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
    console.log(formState.forIsValid);
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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({ type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          id='title'
          label='Title'
          errorText='Please enter a valid title!'
          onInputChange={inputChangeHandler}
          initialValue={prod ? prod.title : ""}
          initialValid={!!prod}
          required
        />
        <Input
          id='imageUrl'
          label='Image URL'
          errorText='Please enter a valid image URL!'
          returnKeyType='next'
          keyboardType='default'
          onInputChange={inputChangeHandler}
          initialValue={prod ? prod.imageUrl : ""}
          initialValid={!!prod}
          required
        />
        {!prodId && (
          <Input
            id='price'
            label='Price'
            errorText='Please enter a valid price!'
            returnKeyType='next'
            keyboardType='decimal-pad'
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          multiline
          numberOfLines={3}
          id='description'
          label='Description'
          errorText='Please enter a valid description!'
          onInputChange={inputChangeHandler}
          initialValue={prod ? prod.description : ""}
          initialValid={!!prod}
          required
          minLength={5}
        />
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
  }
});

export default EditProduct;
