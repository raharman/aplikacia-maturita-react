import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { avatarDesign } from "../components/ProfileCustomization";

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const docRef = doc(db, "Používatelia", auth.currentUser.uid);

  const [modalVisible, setModalVisible] = useState(false);

  const [eyesIndex, setEyesIndex] = useState(0);
  const [hairIndex, setHairIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [mouthIndex, setMouthIndex] = useState(0);
  const [noseIndex, setNoseIndex] = useState(0);
  const [facialHairIndex, setFacialHairIndex] = useState(0);
  const [hairColorIndex, setHairColorIndex] = useState(0);
  const [clothingColorIndex, setClothingColorIndex] = useState(0);
  const [skinColorIndex, setSkinColorIndex] = useState(0);

  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
      setEyesIndex(doc.data().avatarConfig.eyesIdx);
      setHairIndex(doc.data().avatarConfig.hairIdx);
      setBodyIndex(doc.data().avatarConfig.bodyIdx);
      setMouthIndex(doc.data().avatarConfig.mouthIdx);
      setNoseIndex(doc.data().avatarConfig.noseIdx);
      setFacialHairIndex(doc.data().avatarConfig.facialHairIdx);
      setHairColorIndex(doc.data().avatarConfig.hairColorIdx);
      setClothingColorIndex(doc.data().avatarConfig.clothingColorIdx);
      setSkinColorIndex(doc.data().avatarConfig.skinColorIdx);
    });
  }, []);

  function handleChange(state, setState, type, increment) {
    if (increment) {
      if (state + 1 > avatarDesign[type].length - 1) {
        setState(0);
        return;
      }

      setState(state + 1);
    } else {
      if (state === 0) {
        setState(avatarDesign[type].length - 1);
        return;
      }
      setState(state - 1);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Image
              source={{
                uri:
                  "https://avatars.dicebear.com/api/personas/:seed.png?" +
                  "eyes[]=" +
                  avatarDesign.eyes[eyesIndex] +
                  "&&" +
                  "hair[]=" +
                  avatarDesign.hair[hairIndex] +
                  "&&" +
                  "body[]=" +
                  avatarDesign.body[bodyIndex] +
                  "&&" +
                  "mouth[]=" +
                  avatarDesign.mouth[mouthIndex] +
                  "&&" +
                  "nose[]=" +
                  avatarDesign.nose[noseIndex] +
                  "&&" +
                  "facialHair[]=" +
                  avatarDesign.facialHair[facialHairIndex] +
                  "&&" +
                  "hairColor[]=" +
                  avatarDesign.hairColor[hairColorIndex] +
                  "&&" +
                  "clothingColor[]=" +
                  avatarDesign.clothingColor[clothingColorIndex] +
                  "&&" +
                  "skinColor[]=" +
                  avatarDesign.skinColor[skinColorIndex],
              }}
              style={{
                width: 200,
                height: 200,
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

        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.logoutText}>Upaviť postavičku</Text>
        </TouchableOpacity>

        <Modal
          isVisible={modalVisible}
          style={{ backgroundColor: "#E1E1E1", margin: 0 }}
          deviceWidth={windowWidth}
          deviceHeight={windowHeight}
        >
          <Image
            source={{
              uri:
                "https://avatars.dicebear.com/api/personas/:seed.png?" +
                "eyes[]=" +
                avatarDesign.eyes[eyesIndex] +
                "&&" +
                "hair[]=" +
                avatarDesign.hair[hairIndex] +
                "&&" +
                "body[]=" +
                avatarDesign.body[bodyIndex] +
                "&&" +
                "mouth[]=" +
                avatarDesign.mouth[mouthIndex] +
                "&&" +
                "nose[]=" +
                avatarDesign.nose[noseIndex] +
                "&&" +
                "facialHair[]=" +
                avatarDesign.facialHair[facialHairIndex] +
                "&&" +
                "hairColor[]=" +
                avatarDesign.hairColor[hairColorIndex] +
                "&&" +
                "clothingColor[]=" +
                avatarDesign.clothingColor[clothingColorIndex] +
                "&&" +
                "skinColor[]=" +
                avatarDesign.skinColor[skinColorIndex],
            }}
            style={{
              alignSelf: "center",
              marginRight: "auto",
              marginLeft: "auto",
              width: 250,
              height: 250,
              backgroundColor: "#4A7A96",
              borderColor: "#2C5C78",
              borderWidth: 5,
              borderRadius: 360,
              marginTop: 50,
              marginBottom: 10,
            }}
          />
          <ScrollView
            style={{
              borderColor: "#2C5C78",
              borderTopWidth: 5,
              width: "90%",
              alignSelf: "center",
              alignContent: "center",
            }}
          >
            <View style={styles.options}>
              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Oči
                </Text>
                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(eyesIndex, setEyesIndex, "eyes", false);
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{eyesIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(eyesIndex, setEyesIndex, "eyes", true);
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Vlasy
                </Text>
                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(hairIndex, setHairIndex, "hair", false);
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{hairIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(hairIndex, setHairIndex, "hair", true);
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Telo
                </Text>
                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(bodyIndex, setBodyIndex, "body", false);
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{bodyIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(bodyIndex, setBodyIndex, "body", true);
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Ústa
                </Text>
                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(mouthIndex, setMouthIndex, "mouth", false);
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{mouthIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(mouthIndex, setMouthIndex, "mouth", true);
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Nos
                </Text>
                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(noseIndex, setNoseIndex, "nose", false);
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{noseIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(noseIndex, setNoseIndex, "nose", true);
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Brada
                </Text>
                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        facialHairIndex,
                        setFacialHairIndex,
                        "facialHair",
                        false
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{facialHairIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        facialHairIndex,
                        setFacialHairIndex,
                        "facialHair",
                        true
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Farba vlasov
                </Text>

                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        hairColorIndex,
                        setHairColorIndex,
                        "hairColor",
                        false
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{hairColorIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        hairColorIndex,
                        setHairColorIndex,
                        "hairColor",
                        true
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Farba oblečenia
                </Text>

                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        clothingColorIndex,
                        setClothingColorIndex,
                        "clothingColor",
                        false
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{clothingColorIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        clothingColorIndex,
                        setClothingColorIndex,
                        "clothingColor",
                        true
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.optionContainer}>
                <Text style={[styles.modalText, styles.textUnderLine]}>
                  Farba pleti
                </Text>
                <View style={styles.pickerBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        skinColorIndex,
                        setSkinColorIndex,
                        "skinColor",
                        false
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-back-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalText}>{skinColorIndex}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleChange(
                        skinColorIndex,
                        setSkinColorIndex,
                        "skinColor",
                        true
                      );
                    }}
                  >
                    <Ionicons
                      name="arrow-forward-circle-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() => {
              getDoc(doc(db, "Používatelia", auth.currentUser.uid)).then(
                (document) =>
                  setDoc(doc(db, "Používatelia", auth.currentUser.uid), {
                    ...document.data(),
                    avatarConfig: {
                      eyesIdx: eyesIndex,
                      hairIdx: hairIndex,
                      bodyIdx: bodyIndex,
                      mouthIdx: mouthIndex,
                      noseIdx: noseIndex,
                      facialHairIdx: facialHairIndex,
                      hairColorIdx: hairColorIndex,
                      clothingColorIdx: clothingColorIndex,
                      skinColorIdx: skinColorIndex,
                    },
                  })
              );
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.logoutText}>Uložiť a Zatvoriť</Text>
          </TouchableOpacity>
        </Modal>

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
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
  },
  optionContainer: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#3C3C44",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    minHeight: 85,
    minWidth: "30%",
    maxWidth: "30%",
    alignItems: "center",
    marginVertical: 3,
    marginHorizontal: 3,
  },
  options: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBox: {
    width: "100%",
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalText: {
    color: "white",
    textAlign: "center",
  },

  textUnderLine: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    borderBottomStartRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomEndRadius: 2,
    minWidth: "70%",
  },
});
