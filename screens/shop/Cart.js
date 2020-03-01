import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartCard from "../../components/shop/CartCard";
import { deleteFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

const Cart = props => {
  const dispatch = useDispatch();

  const total = useSelector(state => state.cart.total);
  const cartItems = useSelector(state => {
    const itemsArr = [];
    for (const id in state.cart.items) {
      itemsArr.push({
        productId: id,
        productTitle: state.cart.items[id].productTitle,
        productPrice: state.cart.items[id].productPrice,
        quantity: state.cart.items[id].quantity,
        sum: state.cart.items[id].sum
      });
    }
    return itemsArr.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(total.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title='Order'
          disabled={cartItems.length === 0}
          onPress={() => dispatch(addOrder(cartItems, total))}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={dataItem => (
          <CartCard item={dataItem.item} onRemove={() => dispatch(deleteFromCart(dataItem.item.productId))} deletable />
        )}
      />
    </View>
  );
};

Cart.navigationOptions = {
  headerTitle: "Your Cart"
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default Cart;
