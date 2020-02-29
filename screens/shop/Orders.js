import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

const Orders = props => {
  const orders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.total}</Text>}
    />
  );
};

Orders.navigationOptions = {
  headerTitle: "Your Orders"
};

export default Orders;
