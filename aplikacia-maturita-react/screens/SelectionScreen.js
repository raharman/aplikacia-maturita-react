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
import { SearchBar } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";

const SelectionScreen = ({ route, navigation }) => {
  const { title } = route.params;

  const [topics, setTopics] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [pickerValue, setPickerValue] = useState("Literatúra");
  const [pickerValueCount, setPickerValueCount] = useState(5);

  const [questionCount, setQuestionCount] = useState();

  /* const [filteredData, setFilteredData] = useState([]); */

  const topicsCollectionRef = collection(db, title);

  const getTopics = async () => {
    const data = await getDocs(topicsCollectionRef);
    setTopics(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setQuizzes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    /* setFilteredData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); */
  };

  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
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
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
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
          <View>
            <Picker
              style={styles.picker}
              selectedValue={pickerValueCount}
              onValueChange={(itemValue) => setPickerValueCount(itemValue)}
            >
              <Picker.Item label="Malý - 5 otázok" value="5"></Picker.Item>
              <Picker.Item label="Stredný - 10 otázok" value="10"></Picker.Item>
              <Picker.Item label="Veľký - 15 otázok" value="15"></Picker.Item>
            </Picker>
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
                count: pickerValueCount,
                type: pickerValue,
              })
            }
          >
            <Text style={styles.buttonText}>Spustiť kvíz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, margin: 0 }}>
        <View style={{ margin: 0 }}>
          <SearchBar
            placeholder="Vyhľadávanie"
            onChangeText={updateSearch}
            value={search}
            round={true}
            searchIcon={<Ionicons name="search" size={16} color="black" />}
            showLoading={false}
            containerStyle={[
              styles.searchContainer,
              {
                backgroundColor:
                  title == "Literatúra"
                    ? "rgba(205, 57, 88, 0.48)"
                    : title == "Gramatika"
                    ? "#333f58"
                    : "#FBBBAD",
              },
            ]}
            inputContainerStyle={styles.inputContainer}
            /* clearIcon={<Ionicons name="close" size={16} color="black" />} */
          />
        </View>
        <ScrollView>
          <View style={styles.buttonContainer}>
            {topics
              .sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
              .filter((topic) =>
                topic.name.toLowerCase().includes(search.toLowerCase())
              )
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
      </View>
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
  /* inputContainer: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  }, */
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
    marginTop: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgb(251, 187, 173)",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  searchContainer: {
    backgroundColor: "#333f58",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 0,
    height: 50,
    /* transform: [{ translate: [0, -5] }], */
  },
  inputContainer: {
    height: 35,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 7,
    alignSelf: "center",
  },
});
