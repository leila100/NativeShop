import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import Products from "../screens/shop/Products";
import Product from "../screens/shop/Product";
import Colors from "../constants/Colors";

const ProductsNavigator = createStackNavigator(
  {
    Products: {
      screen: Products,
      navigationOptions: {
        headerTitle: " All Products"
      }
    },
    Product: Product
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);
