import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Pressable, TouchableOpacity } from "react-native-web";
import { SafeAreaView } from "react-native-safe-area-context";

let quiz = [];
let index = 0;
const QuizScreen = ({ route }) => {
  const navigation = useNavigation();

  const { title, quizId } = route.params;

  const collectionRef = collection(db, "Kvízy", quizId, "questions");

  /* const [quiz, setQuiz] = useState([]); */
  //let quiz = [];
  const [question, setQuestion] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isAnswered, setAnswered] = useState(false);

  const getQuiz = async () => {
    const data = await getDocs(collectionRef);

    quiz = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setQuestion(quiz[index]);
    setLoading(false);
  };

  useEffect(() => {
    index = 0;
    getQuiz();
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: "#FBBBAD",
      },
    });
  }, [title]);

  function handleSubmit(answer) {
    setAnswered(true);
  }

  function handleNextQuestion() {
    index += 1;
    if (index < quiz.length) {
      setQuestion(quiz[index]);
      setAnswered(false);
    }
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.buttonContainer}>
        <View key={question.id}>
          <View style={styles.button}>
            <Text style={styles.buttonHeader}>{question.question}</Text>
          </View>
          {question.answers.map((option, key) => {
            return (
              <TouchableOpacity
                style={
                  isAnswered
                    ? option.answer === true
                      ? styles.correct
                      : styles.wrong
                    : styles.answer
                }
                key={key}
                disabled={isAnswered}
                onPress={(e) => {
                  handleSubmit(option.answer);
                  e.currentTarget.style.border = "solid 5px yellow";
                }}
              >
                <Text style={styles.buttonHeader}>{option.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ProgressBar */}

      {/* Next Button */}
      {isAnswered ? (
        index !== quiz.length - 1 ? (
          <Pressable
            style={styles.nextButton}
            onPress={() => handleNextQuestion()}
          >
            <Text style={styles.nextButtonText}>Ďalšia otázka</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.nextButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.nextButtonText}>Koniec Quizu</Text>
          </Pressable>
        )
      ) : null}
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  all: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    margin: "auto",
  },
  button: {
    backgroundColor: "#E1E1E1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  answer: {
    backgroundColor: "#E1E1E1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  correct: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  wrong: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
  buttonHeader: {
    color: "#3C3C44",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 5,
  },
  nextButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#E1E1E1",
  },
  nextButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
