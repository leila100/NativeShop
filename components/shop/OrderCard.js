import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import CartCard from "./CartCard";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderCard = props => {
  const [showDetails, setShowDetails] = useState(false);

  const { items, total } = props.order;
  const date = props.order.readableDate;
  // const date = props.date;
  return (
    <Card style={styles.order}>
      <View style={styles.summary}>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && (
        <View style={styles.items}>
          {items.map(item => (
            <CartCard item={item} key={item.productId} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  order: {
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
  },
  items: {
    width: "100%"
  }
});

export default OrderCard;
