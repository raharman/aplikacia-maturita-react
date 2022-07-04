import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  limit,
  orderBy,
  query,
  collection,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { avatarDesign } from "../components/ProfileCustomization";
const TopScreen = () => {
  const [top, setTop] = useState([]);

  const topCollectionRef = collection(db, "Používatelia");

  const getTop = async () => {
    const data = await getDocs(
      query(topCollectionRef, orderBy("points", "desc"), limit(5))
    );

    setTop(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  /* useEffect(() => {
    getTop();
  }, []); */

  const q = query(topCollectionRef, orderBy("points", "desc"), limit(5));

  useEffect(() => {
    return onSnapshot(q, (querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setTop(docs);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {top.map((user, index) => {
          return (
            <View style={styles.card} key={user?.id}>
              <View style={styles.textContainer}>
                <Text
                  style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}
                >
                  {user?.first_name} {user?.last_name.slice(0, 1) + "."}
                </Text>
                <Text style={styles.text}>Počet bodov: {user?.points}</Text>
                <Text style={styles.text}>Škola: {user?.school}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      "https://avatars.dicebear.com/api/personas/:seed.png?" +
                      "eyes[]=" +
                      avatarDesign.eyes[user.avatarConfig.eyesIdx] +
                      "&&" +
                      "hair[]=" +
                      avatarDesign.hair[user.avatarConfig.hairIdx] +
                      "&&" +
                      "body[]=" +
                      avatarDesign.body[user.avatarConfig.bodyIdx] +
                      "&&" +
                      "mouth[]=" +
                      avatarDesign.mouth[user.avatarConfig.mouthIdx] +
                      "&&" +
                      "nose[]=" +
                      avatarDesign.nose[user.avatarConfig.noseIdx] +
                      "&&" +
                      "facialHair[]=" +
                      avatarDesign.facialHair[user.avatarConfig.facialHairIdx] +
                      "&&" +
                      "hairColor[]=" +
                      avatarDesign.hairColor[user.avatarConfig.hairColorIdx] +
                      "&&" +
                      "clothingColor[]=" +
                      avatarDesign.clothingColor[
                        user.avatarConfig.clothingColorIdx
                      ] +
                      "&&" +
                      "skinColor[]=" +
                      avatarDesign.skinColor[user.avatarConfig.skinColorIdx],
                  }}
                  style={[
                    styles.image,
                    index === 0
                      ? styles.firstPlace
                      : index === 1
                      ? styles.secondPlace
                      : index === 2
                      ? styles.thirdPlace
                      : null,
                  ]}
                />
                {(() => {
                  if (index < 3) {
                    return (
                      <Ionicons
                        name="trophy"
                        size={index === 0 ? 28 : index === 1 ? 24 : 20}
                        color="white"
                        style={[
                          styles.icon,
                          {
                            color:
                              index === 0
                                ? "#cfb017"
                                : index === 1
                                ? "#9c9796"
                                : index === 2
                                ? "#B26E63"
                                : null,
                          },
                        ]}
                      />
                    );
                  }
                })()}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default TopScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1E1E1",
    borderRadius: 10,
    width: "80%",
    height: 100,
    marginVertical: 15,
  },
  textContainer: {
    flex: 1,
    alignSelf: "flex-start",
    margin: 15,
  },
  text: {
    fontSize: 16,
  },
  imageContainer: {
    alignSelf: "flex-end",
    margin: 15,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: "#4A7A96",
    borderColor: "#2C5C78",
    borderWidth: 3,
    borderRadius: 360,
    alignSelf: "center",
  },
  icon: {
    position: "absolute",
    width: "auto",
    height: "auto",
    color: "gray",
    alignSelf: "center",
    bottom: -10,
  },
  firstPlace: {
    borderColor: "gold",
    borderWidth: 3,
  },
  secondPlace: {
    borderColor: "silver",
    borderWidth: 3,
  },
  thirdPlace: {
    borderColor: "#B26E63",
    borderWidth: 3,
  },
});
