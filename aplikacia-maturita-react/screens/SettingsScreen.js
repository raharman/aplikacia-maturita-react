import React, { useState } from "react";
import { StyleSheet, View, Switch, Text, Appearance } from "react-native";

let theme = { curr: "light", isSet: false };
export { theme };

const SettingsScreen = () => {
  const [isEnabledN, setIsEnabledN] = useState(false);
  const toggleNotification = () =>
    setIsEnabledN((previousState) => !previousState);

  const [isEnabledM, setIsEnabledM] = useState(
    theme.curr == "light" ? false : true
  );
  const toggleDarkMode = () => {
    theme.curr = theme.curr == "light" ? "dark" : "light";
    theme.isSet = true;
    setIsEnabledM((previousState) => !previousState);
  };

  let color1 = "white";
  let color2 = "#F0EDEE";

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.text}>Notifikácie</Text>
        <Switch
          trackColor={{ false: color2, true: color1 }}
          thumbColor="white"
          onValueChange={toggleNotification}
          value={isEnabledN}
        />
      </View>
      <View style={styles.rect}>
        <Text style={styles.text}>Tmavý režim</Text>
        <Switch
          trackColor={{ false: color2, true: color1 }}
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
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  rect: {
    width: "80%",
    height: "10%",
    backgroundColor: "#E1E1E1",
    borderRadius: 19,
    marginVertical: "6%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "#3C3C44",
    fontWeight: "700",
    fontSize: 24,
  },
});
