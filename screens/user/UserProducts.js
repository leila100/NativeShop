import React, { useState } from "react";
import { View, Text, FlatList, Platform, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductCard from "../../components/shop/ProductCard";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProducts = props => {
  const [isLoading, setIsLoading] = useState(false);

  const userProds = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProdHandler = prodId => {
    props.navigation.navigate("EditProduct", { prodId: prodId });
  };

  const deleteHandler = id => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          await dispatch(deleteProduct(id));
          setIsLoading(false);
        }
      }
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && userProds.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found! Maybe start adding some.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProds}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductCard prod={itemData.item} onSelect={() => editProdHandler(itemData.item.id)}>
          <Button color={Colors.primary} title='Edit' onPress={() => editProdHandler(itemData.item.id)} />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => {
              deleteHandler(itemData.item.id);
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Add'
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => navData.navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" }
});
export default UserProducts;
