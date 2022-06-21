import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

const ProfileScreen = () => {
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

  const profilePicture = user?.id;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Image
              source={{
                uri:
                  "https://avatars.dicebear.com/api/personas/:" +
                  profilePicture +
                  ".png",
              }}
              style={{
                width: 250,
                height: 250,
                backgroundColor: "#4A7A96",
                borderColor: "#2C5C78",
                borderWidth: 5,
                borderRadius: 360,
              }}
            />
          </View>

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
    </ScrollView>
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
    color: "#3C3C44",
    fontSize: 24,
    marginTop: 10,
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
