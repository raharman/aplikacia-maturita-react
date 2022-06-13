import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({});
  const docRef = doc(db, "Používatelia", auth.currentUser.uid);

  const SignOut = () => {
    auth
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    return onSnapshot(docRef, (doc) => {
      setUser(doc.data());
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/images/profilovka.jpg")}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <Text style={styles.text}>
          {user?.first_name ?? ""} {user?.last_name ?? ""}
        </Text>
        <Text style={styles.text}>Skóre: {user?.points ?? ""}</Text>
        <Text style={styles.text}>Škola: {user?.school ?? ""}</Text>
      </View>

      <TouchableOpacity style={styles.logoutContainer} onPress={SignOut}>
        <Text style={styles.logoutText}>Odhlásiť sa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#E1E1E1",
    padding: 25,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: "center",
  },
  text: {
    color: "3C3C44",
    fontSize: 24,
    marginTop: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  schoolContainer: {},
  schoolText: {},
  logoutContainer: {
    backgroundColor: "rgba(44,92,120,1)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
  },
});
