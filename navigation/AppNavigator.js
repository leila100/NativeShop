import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import ShopNavigator from "./ShopNavigator";
import Products from "../screens/shop/Products";

const MyStack = createStackNavigator();

const AppNavigator = () => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen name='Products' component={Products} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
