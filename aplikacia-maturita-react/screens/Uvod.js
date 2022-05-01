import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import app from "../app.json";
import { AppRegistry, Platform } from "react-native";
import { registerRootComponent } from "expo";

const Uvod = () => {
  const navigation = useNavigation();

  if (Platform.OS == "android") {
    registerRootComponent(App);
  } else {
    AppRegistry.registerComponent(app?.expo?.name, () => App);
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.welcomeHeader}>Maturita {"\n"}vo vrecku</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={styles.pismo}>Prihlásiť sa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={[styles.button, { backgroundColor: "rgba(215,215,215,1)" }]}
      >
        <Text style={[styles.pismo, { color: "rgba(51,51,51,1)" }]}>
          Registrácia
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(238,238,238,1)",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  welcomeHeader: {
    /* fontFamily: "roboto-700", */
    color: "rgba(51,51,51,1)",
    textAlign: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "rgba(74,122,150,1)",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "7%",
    marginLeft: "25%",
    marginTop: "10%",
  },
  pismo: {
    /* fontFamily: "inter-600", */
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
});

export default Uvod;
