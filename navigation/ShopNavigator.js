import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Products from "../screens/shop/Products";
import Product from "../screens/shop/Product";
import Cart from "../screens/shop/Cart";
import Orders from "../screens/shop/Orders";
import UserProducts from "../screens/user/UserProducts";
import EditProduct from "../screens/user/EditProduct";
import Colors from "../constants/Colors";

const defaultOptions = {
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
};

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
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name={Platform.OS === "android" ? "md-cart" : "ios-cart"} size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: Orders
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name={Platform.OS === "android" ? "md-list" : "ios-list"} size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultOptions
  }
);

const UserNavigator = createStackNavigator(
  {
    UserProducts: UserProducts,
    EditProduct: EditProduct
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: UserNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
