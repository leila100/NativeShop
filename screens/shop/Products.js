import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Platform, Button, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductCard from "../../components/shop/ProductCard";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { fetchProducts } from "../../store/actions/products";

const Products = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProds = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadProds);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProds]);

  useEffect(
    () => {
      loadProds();
    },
    [dispatch],
    loadProds
  );

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("Product", { productId: id, productTitle: title });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred: {error}</Text>
        <Button title='Try again' onPress={loadProds} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found! Maybe start adding some.</Text>
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
