import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import RenderHtml from "react-native-render-html";
import { Choice, MultipleChoice } from "../components/Questions";

const TopicScreen = ({ route }) => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const { title, type, topicId } = route.params;

  const docRef = doc(db, type, topicId);

  const [topic, setTopic] = useState([]);

  useEffect(
    () =>
      onSnapshot(docRef, (doc) => {
        setTopic(doc.data());
      }),
    []
  );

  useEffect(() => {
    const titleWidth = width / 21;
    navigation.setOptions({
      title:
        Platform.OS === "android" && title.length > titleWidth
          ? title.slice(0, titleWidth) + "..."
          : title,
      headerStyle: {
        backgroundColor:
          type == "Literatúra" ? "rgba(205, 57, 88, 0.48)" : "#333f58",
      },
      headerBackTitleVisible: false,
    });
  }, [title]);

  tagsStyles.h4.backgroundColor =
    type == "Literatúra" ? "rgba(205, 57, 88, 0.48)" : "#333f58";

  if (Platform.OS === "android") {
    tagsStyles.p.width = 300;
    tagsStyles.ul.width = 300;
    tagsStyles.ol.width = 300;
  }

  return (
    <ScrollView style={styles.all} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: topic.text ?? "<div></div>" }}
            tagsStyles={tagsStyles}
          />
        </Text>
      </View>
    </ScrollView>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({
  all: {
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

var tagsStyles = {
  body: {
    textAlign: "justify",
  },
  h4: {
    display: "flex",
    color: "white",
    backgroundColor: "rgba(205, 57, 88, 0.48)",
    borderRadius: 50,
    marginLeft: "0",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 5,
    padding: "4px 8px",
  },
  p: {
    margin: 5,
  },
  ul: {
    /* margin: 0, */
  },
  ol: {
    /* margin: 0, */
  },
};
