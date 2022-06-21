import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [School, setSchool] = useState("GPH");

  const showToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        /* navigation.replace("Home"); */
      }
    });

    return unsubscribe;
  }, []);

  const SignUp = () => {
    if (!(email && password && Name && LastName && School))
      return showToast("Všetky polia musia byť vyplnené!");

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
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showToast("Táto emailová adresa sa už používa!");
        } else if (error.code === "auth/missing-email") {
          showToast("Zadajte emailovú adresu!");
        } else if (error.code === "auth/invalid-email") {
          showToast("Emailová adresa chýba alebo je neplatná!");
        } else if (error.code === "auth/internal-error") {
          showToast("Nastala chyba, skúste to neskôr!");
        } else if (error.code === "auth/weak-password") {
          showToast("Heslo musí obsahovať aspoň 6 znakov!");
        }
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
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
          </View>

          <View>
            <Picker
              style={styles.picker}
              selectedValue={School}
              itemStyle={{ height: 125 }}
              onValueChange={(School) => setSchool(School)}
            >
              <Picker.Item
                label="Gymnázium Pavla Horova"
                value="GPH"
              ></Picker.Item>
              <Picker.Item
                label="Gymnázium Ľudovíta Štúra"
                value="GĽŠ"
              ></Picker.Item>
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => SignUp()} style={styles.button}>
              <Text style={[styles.buttonOutlineText, styles.buttonText]}>
                Zaregistrovať sa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: "15%",
    flex: 1,
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
    width: "80%",
    height: "45%",
  },
  welcomeHeader: {
    color: "rgba(51,51,51,1)",
    textAlign: "center",
    alignItems: "center",
    fontSize: 48,
    fontWeight: "bold",
  },
  picker: {
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "rgb(182,180,180)",
    borderWidth: 1,
    width: 325,
  },
  scrollContainer: {
    alignSelf: "center",
    height: "100%",
  },
});
