import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ProductsNavigator, OrdersNavigator } from "./ShopNavigator";

const AppNavigator = () => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <NavigationContainer>
      <ProductsNavigator />
      <OrdersNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
