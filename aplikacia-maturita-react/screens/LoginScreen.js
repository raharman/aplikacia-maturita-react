import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  /* useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate("Home")
      }
    })

    return unsubscribe
  }, []) */

  /*
  const SignUp = () => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((res)=>{
      setIsSignedIn(true);
      console.log(res);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  */

  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.welcomeHeader}> Prihlásenie </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
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
    backgroundColor: "rgba(74,122,150,1)",
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
    width: 414,
    height: 414,
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
