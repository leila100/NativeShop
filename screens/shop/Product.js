import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Image, Button, ScrollView } from "react-native";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const Product = props => {
  const prodId = props.navigation.getParam("productId");
  const selectedProd = useSelector(state => state.products.availableProducts.find(product => product.id === prodId));
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProd.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Add to Cart'
          onPress={() => dispatch(cartActions.addToCart(itemData.item))}
        />
      </View>
      <Text style={styles.price}>${selectedProd.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProd.description}</Text>
    </ScrollView>
  );
};

Product.navigationOptions = navData => {
  const title = navData.navigation.getParam("productTitle");
  return {
    headerTitle: title
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20
  },
  actions: {
    marginVertical: 10,
    alignItems: "center"
  }
});

export default Product;
