import React, { useState, useEffect } from "react";
import { View, FlatList, Platform, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductCard from "../../components/shop/ProductCard";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { fetchProducts } from "../../store/actions/products";

const Products = props => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProds = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts());
      setIsLoading(false);
    };
    loadProds();
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("Product", { productId: id, productTitle: title });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductCard prod={itemData.item} onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}>
          <Button
            color={Colors.primary}
            title='Details'
            onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
          />
          <Button
            color={Colors.primary}
            title='Add to Cart'
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductCard>
      )}
    />
  );
};

Products.navigationOptions = navData => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
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

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" }
});

export default Products;
