import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SelectionScreen = ({ route, navigation }) => {
  const { title } = route.params;

  const [topics, setTopics] = useState([]);

  const topicsCollectionRef = collection(db, title);

  const getTopics = async () => {
    const data = await getDocs(topicsCollectionRef);
    setTopics(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getTopics();

    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor:
          title == "Literatúra"
            ? "rgba(205, 57, 88, 0.48)"
            : "rgba(51, 63, 88, 1)",
      },
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        {topics
          .sort(function (a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })
          .map((topic) => {
            return (
              <TouchableOpacity
                key={topic.id}
                onPress={() =>
                  navigation.navigate("Selected", {
                    title: topic.name,
                    topicId: topic.id,
                    type: topic.type,
                  })
                }
                style={styles.button}
              >
                <Text style={styles.buttonHeader}>{topic.name}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default SelectionScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    margin: "auto",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E1E1E1",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
    marginVertical: "10px",
    flexWrap: "wrap",
    alignContent: "center",
  },
  buttonHeader: {
    color: "#3C3C44",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 5,
  },
  icon: {
    width: "44px",
    height: "44px",
    backgroundColor: "#4A7A96",
    borderRadius: 10,
    padding: "10px",
  },
});
