import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CartCard = props => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) TouchableComp = TouchableNativeFeedback;
  const { quantity, productTitle, sum } = props.item;
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${sum.toFixed(2)}</Text>
        <TouchableComp onPress={props.onRemove}>
          <Ionicons
            style={styles.deleteButton}
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color='red'
          />
        </TouchableComp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center"
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});
export default CartCard;
