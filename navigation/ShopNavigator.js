import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import Products from "../screens/shop/Products";
import Product from "../screens/shop/Product";
import Cart from "../screens/shop/Cart";
import Colors from "../constants/Colors";

const ProductsNavigator = createStackNavigator(
  {
    Products: {
      screen: Products,
      navigationOptions: {
        headerTitle: " All Products"
      }
    },
    Product: Product,
    Cart: Cart
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitleStyle: {
        fontFamily: "open-sans-bold"
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans"
      }
    }
  }
);

export default createAppContainer(ProductsNavigator);
