import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { authenticate, setDidTryAl } from "../store/actions/auth";

const Startup = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        // props.navigation.navigate("Auth");
        dispatch(setDidTryAl());
        return;
      }
      const data = JSON.parse(userData);
      const { token, userId, expirationDate } = data;
      const expire = new Date(expirationDate);
      if (expire <= new Date() || !token || !userId) {
        // props.navigation.navigate("Auth");
        dispatch(setDidTryAl);
        return;
      }

      const expirationTime = expire.getTime() - new Date().getTime();

      // props.navigation.navigate("Shop");
      dispatch(authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Startup;
