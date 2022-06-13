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
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [School, setSchool] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log(user.uid);
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const SignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setDoc(doc(db, "Používatelia", res.user.uid), {
          id: res.user.uid,
          first_name: Name,
          last_name: LastName,
          email: email,
          role: "USER",
          school: School,
          points: 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {Platform.OS !== "android" ? (
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.image}
        />
      ) : null}
      <Text style={styles.welcomeHeader}> Registrácia </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#B6B4B4"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Heslo"
          placeholderTextColor={"#B6B4B4"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Meno"
          placeholderTextColor={"#B6B4B4"}
          value={Name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Priezvisko"
          placeholderTextColor={"#B6B4B4"}
          value={LastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Škola"
          placeholderTextColor={"#B6B4B4"}
          value={School}
          onChangeText={(text) => setSchool(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => SignUp()}
          style={[styles.button, { backgroundColor: "rgba(182,180,180,1)" }]}
        >
          <Text style={[styles.buttonOutlineText, styles.buttonText]}>
            Zaregistrovať sa
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    marginTop: 20,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "gray",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "gray",
    borderWidth: 2,
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
