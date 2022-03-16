import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, Switch, TouchableOpacity, Text } from "react-native";

const SettingsScreen = () => {
  /* const navigation = useNavigation();

  const SignOut = () => {
    signOut(auth)
    .then(() =>{
      navigation.navigate("Top");
    })
    .catch((err)=>{
      console.log(err)
    })
  } */
  const [isEnabledN, setIsEnabledN] = useState(false);
  const toggleNotification = () =>
    setIsEnabledN((previousState) => !previousState);

  const [isEnabledM, setIsEnabledM] = useState(false);
  const toggleDarkMode = () => setIsEnabledM((previousState) => !previousState);

  let color1 = "#f5dd4b";
  let color2 = "#f4f3f4";

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.notifikacie}>Notifikácie</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabledN ? color1 : color2}
          onValueChange={toggleNotification}
          value={isEnabledN}
        />
      </View>
      <View>
        <Text style={styles.notifikacie}>Tmavý režim</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabledM ? color1 : color2}
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
    justifyContent: "center",
  },
});
