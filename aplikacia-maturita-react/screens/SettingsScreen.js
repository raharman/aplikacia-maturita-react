import React, { useState } from "react";
import { StyleSheet, View, Switch, Text } from "react-native";

const SettingsScreen = () => {
  const [isEnabledN, setIsEnabledN] = useState(false);
  const toggleNotification = () =>
    setIsEnabledN((previousState) => !previousState);

  const [isEnabledM, setIsEnabledM] = useState(false);
  const toggleDarkMode = () => setIsEnabledM((previousState) => !previousState);

  let color1 = "#f5dd4b";
  let color2 = "#f4f3f4";

  return (
    <View style={styles.container}>
      <View style={styles.head_rect}>
        <Text style={styles.head_text}>Nastavenia</Text>
      </View>
      <View style={styles.rect}>
        <Text style={styles.text}>Notifikácie</Text>
        <Switch
          trackColor={{ false: "white", true: "#56BBF1" }}
          thumbColor="white"
          onValueChange={toggleNotification}
          value={isEnabledN}
        />
      </View>
      <View style={styles.rect}>
        <Text style={styles.text}>Tmavý režim</Text>
        <Switch
          trackColor={{ false: "white", true: "#56BBF1" }}
          thumbColor="white"
          onValueChange={toggleDarkMode}
          value={isEnabledM}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rect: {
    width: "75%",
    height: "10%",
    backgroundColor: "rgba(215,215,215,1)",
    borderRadius: 19,
    marginVertical: "6%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontFamily: "inter-600",
    textAlign: "center",
    fontSize: "150%",
  },
  head_rect: {
    width: "100%",
    height: "7%",
    backgroundColor: "rgba(74,122,150,1)",

    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "5%",

    marginBottom: "6%",
  },
  head_text: {
    fontFamily: "roboto-700",
    textAlign: "center",
    fontSize: "300%",
    color: "white",
  },
});
