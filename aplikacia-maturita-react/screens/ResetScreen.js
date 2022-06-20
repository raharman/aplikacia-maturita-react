import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ResetScreen = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const ResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    navigation.replace("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Image
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.header}> Obnovenie hesla </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={ResetPassword} style={styles.button}>
          <Text style={styles.buttonText}>Obnoviť</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    backgroundColor: "rgb(74,122,150)",
    borderRadius: 24,
    width: "60%",
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    alignSelf: "center",
    width: "70%",
    height: "25%",
  },
  header: {
    color: "rgba(51,51,51,1)",
    textAlign: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: "bold",
  },
});
