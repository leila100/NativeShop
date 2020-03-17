import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Products, { screenOptions } from "../screens/shop/Products";
import Product from "../screens/shop/Product";
import Cart from "../screens/shop/Cart";
import Orders from "../screens/shop/Orders";
import UserProducts from "../screens/user/UserProducts";
import EditProduct from "../screens/user/EditProduct";
import Auth from "../screens/user/Auth";
import Startup from "../screens/Startup";
import { logout } from "../store/actions/auth";
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

const ProdsNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProdsNavigator.Navigator screenOptions={defaultOptions}>
      <ProdsNavigator.Screen name='Products' component={Products} options={screenOptions} />
      <ProdsNavigator.Screen name='Product' component={Product} />
      <ProdsNavigator.Screen name='Cart' component={Cart} />
    </ProdsNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     Products: {
//       screen: Products,
//       navigationOptions: {
//         headerTitle: " All Products"
//       }
//     },
//     Product: Product,
//     Cart: Cart
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons name={Platform.OS === "android" ? "md-cart" : "ios-cart"} size={23} color={drawerConfig.tintColor} />
//       )
//     },
//     defaultNavigationOptions: defaultOptions
//   }
// );

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: Orders
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons name={Platform.OS === "android" ? "md-list" : "ios-list"} size={23} color={drawerConfig.tintColor} />
//       )
//     },
//     defaultNavigationOptions: defaultOptions
//   }
// );

// const UserNavigator = createStackNavigator(
//   {
//     UserProducts: UserProducts,
//     EditProduct: EditProduct
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultOptions
//   }
// );

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: UserNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title='Logout'
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(logout());
//                 // props.navigation.navigate("Auth");
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     }
//   }
// );

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: Auth
//   },
//   {
//     defaultNavigationOptions: defaultOptions
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: Startup,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);
