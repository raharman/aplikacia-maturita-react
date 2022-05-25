import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SelectionScreen = ({ route, navigation }) => {
  const { title } = route.params;

  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [pickerValue, setPickerValue] = useState("Vyberte...");
  const [questionCount, setQuestionCount] = useState();

  /* const [filteredData, setFilteredData] = useState([]); */

  const topicsCollectionRef = collection(db, title);

  const getTopics = async () => {
    const data = await getDocs(topicsCollectionRef);
    setTopics(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setQuizzes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    /* setFilteredData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); */
  };

  useEffect(() => {
    getTopics();

    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor:
          title == "Literatúra"
            ? "rgba(205, 57, 88, 0.48)"
            : title == "Gramatika"
            ? "#333f58"
            : "#FBBBAD",
      },
      headerBackTitleVisible: false,
      /* headerSearchBarOptions: {
        placeholder: "Vyhľadať",
        barTintColor: "#FFFFFF",
      }, */
    });
  }, [navigation]);

  if (title == "Kvízy") {
    return (
      /* <ScrollView>
        <View style={styles.buttonContainer}>
          {quizzes
            .sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            .map((quiz) => {
              return (
                <TouchableOpacity
                  key={quiz.id}
                  onPress={() =>
                    navigation.navigate("Quiz", {
                      title: quiz.name,
                      quizId: quiz.id,
                      type: quiz.type,
                    })
                  }
                  style={styles.button}
                >
                  <Text style={styles.buttonHeader}>{quiz.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView> */

      <ScrollView>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Zadajte počet otázok"
              value={questionCount}
              onChangeText={(text) => setQuestionCount(text)}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Picker
              style={styles.picker}
              selectedValue={pickerValue}
              onValueChange={(itemValue) => setPickerValue(itemValue)}
            >
              <Picker.Item label="Literatúra" value="literatúra"></Picker.Item>
              <Picker.Item label="Gramatika" value="gramatika"></Picker.Item>
              <Picker.Item label="Zmiešané" value="zmiešané"></Picker.Item>
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              navigation.navigate("Quiz", {
                count: questionCount,
                type: pickerValue,
              })
            }
          >
            <Text>Spustiť kvíz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
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
  }
};

export default SelectionScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
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
    marginVertical: 10,
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
    width: 44,
    height: 44,
    backgroundColor: "#4A7A96",
    borderRadius: 10,
    padding: 10,
  },
  inputContainer: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  picker: {
    width: "80%",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 25,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "orange",
    borderWidth: 1,
  },
  startButton: {
    backgroundColor: "#E1E1E1",
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
