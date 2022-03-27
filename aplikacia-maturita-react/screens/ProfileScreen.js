import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const SignOut = () => {
    auth
    .signOut()
    .then(() =>{})
    .catch((err)=>{
      /* console.log(err) */
    })
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.head_rect}>
        <Text style={styles.head_text}>Profil</Text>
      </View> */}
      <View style={styles.rect}>
        <Image
          source={require("../assets/images/profilovka.jpg")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.text}>Meno Priezvisko</Text>
      </View>
      <View>
        <View style={styles.margin}>
          <Text style={styles.text2}>Počet bodov:</Text>
          <View style={styles.rect2}>
            <Text style={styles.text2}>xxx</Text>
          </View>
        </View>
        <View style={styles.margin}>
          <Text style={styles.text2}>Škola:</Text>
          <View style={styles.rect2}>
            <Text style={styles.text2}>xxx</Text>
          </View>
        </View>
        <View style={styles.margin}>
          <Text style={styles.text2}>Vek:</Text>
          <View style={styles.rect2}>
            <Text style={styles.text2}>xxx</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.rect3} onPress={SignOut}>
        <Text style={styles.text3}>Odhlásiť sa</Text>
      </TouchableOpacity>
    </View>
  )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  head_rect: {
    width: "100%",
    height: "10%",
    backgroundColor: "rgba(74,122,150,1)",

    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "6%",
  },
  head_text: {
    //fontFamily: "roboto-700",
    textAlign: "center",
    fontSize: "300%",
    color: "white",
  },
  rect: {
    width: "75%",
    height: "25%",
    backgroundColor: "rgba(215,215,215,1)",
    borderRadius: 19,
    marginVertical: "8%",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "5%",
  },
  text: {
    //fontFamily: "inter-600",
    textAlign: "center",
    fontSize: "150%",
  },
  rect2: {
    width: "auto",
    height: "auto",
    backgroundColor: "rgba(74,122,150,10)",
    padding: "1%",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    //fontFamily: "inter-600",
    fontSize: "120%",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  rect3: {
    width: "45%",
    height: "7%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "rgba(44,92,120,1)",
    borderRadius: 19,
    marginTop: "6%",
  },
  text3: {
    //fontFamily: "inter-600",
    textAlign: "center",
    fontSize: "150%",
    color: "white",
  },
  margin: {
    marginVertical: "5%",
  },
});