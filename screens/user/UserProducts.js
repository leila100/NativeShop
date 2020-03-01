import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductCard from "../../components/shop/ProductCard";

const UserProducts = props => {
  const userProds = useSelector(state => state.products.userProducts);
  return (
    <FlatList
      data={userProds}
      keyExtractor={item => item.id}
      renderItem={itemData => <ProductCard prod={itemData.item} onViewDetail={() => {}} onAddToCart={() => {}} />}
    />
  );
};

UserProducts.navigationOptions = navData => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

export default UserProducts;
