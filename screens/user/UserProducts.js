import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductCard from "../../components/shop/ProductCard";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProducts = props => {
  const userProds = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProds}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductCard prod={itemData.item} onSelect={() => {}}>
          <Button color={Colors.primary} title='Edit' onPress={() => {}} />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id));
            }}
          />
        </ProductCard>
      )}
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
