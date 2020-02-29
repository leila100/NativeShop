import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import cartCard from "./CartCard";
import Colors from "../../constants/Colors";

const OrderCard = props => {
  const { items, total } = props.order;
  const date = props.order.readableDate;
  // const date = props.date;
  return (
    <View style={styles.order}>
      <View style={styles.summary}>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button color={Colors.primary} title='Show Details' />
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  total: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888"
  }
});

export default OrderCard;
