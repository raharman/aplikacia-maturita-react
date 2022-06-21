import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const showToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
    });
  };

  const SignIn = () => {
    if (!(email && password))
      return showToast("Všetky polia musia byť vyplnené!");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          showToast("Email alebo heslo je nesprávne!");
        } else if (error.code === "auth/wrong-password") {
          showToast("Email alebo heslo je nesprávne!");
        } else if (error.code === "auth/invalid-email") {
          showToast("Email alebo heslo je nesprávne!");
        }

        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      bbehavior={Platform.OS === "ios" ? "padding" : null}
    >
      <Image
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.welcomeHeader}> Prihlásenie </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#B6B4B4"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Heslo"
          placeholderTextColor={"#B6B4B4"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={SignIn} style={styles.button}>
          <Text style={styles.buttonText}>Prihlásiť sa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, { backgroundColor: "rgba(182,180,180,1)" }]}
        >
          <Text style={[styles.buttonOutlineText, styles.buttonText]}>
            Zaregistrovať sa
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Reset")}
          style={[styles.button, { backgroundColor: "rgba(182,180,180,1)" }]}
        >
          <Text style={[styles.buttonOutlineText, styles.buttonText]}>
            Zabudli ste heslo?
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
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
  buttonOutlineText: {
    color: "gray",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    alignSelf: "center",
    width: "70%",
    height: "25%",
  },
  welcomeHeader: {
    /* fontFamily: "roboto-700", */
    color: "rgba(51,51,51,1)",
    textAlign: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: "bold",
  },
});
