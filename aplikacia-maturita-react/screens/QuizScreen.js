import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

let quiz = [];
let index = -1;
let score = 0;
const QuizScreen = ({ route }) => {
  const navigation = useNavigation();

  const { title, quizId } = route.params;

  const collectionRef = collection(db, "Kvízy", quizId, "questions");

  const [question, setQuestion] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isAnswered, setAnswered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const getQuiz = async () => {
    const data = await getDocs(collectionRef);

    quiz = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    handleNextQuestion();
    setLoading(false);
  };

  useEffect(() => {
    index = -1;
    score = 0;
    getQuiz();
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: "#FBBBAD",
      },
    });
  }, [navigation]);

  function handleSubmit(answer) {
    setAnswered(true);
    if (answer) {
      score++;
    }
    console.log(answer);
    console.log(score);
  }

  function handleNextQuestion() {
    index++;
    if (index < quiz.length) {
      if (["matrix", "choice", "multipleChoice"].includes(quiz[index].type))
        quiz[index].answers = shuffleOptions(quiz[index].answers);
      setQuestion(quiz[index]);
      setAnswered(false);
    }
  }

  function shuffleOptions(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (question?.type == "trueFalse") {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <View key={question?.id}>
            <View style={styles.button}>
              <Text style={styles.buttonHeader}>{question?.question}</Text>
            </View>
            {question?.answers.map((option, key) => {
              return (
                <TouchableOpacity
                  style={
                    isAnswered
                      ? option?.answer === true
                        ? styles.correct
                        : styles.wrong
                      : styles.answer
                  }
                  key={key}
                  disabled={isAnswered}
                  onPress={(e) => {
                    handleSubmit(option?.answer);
                    /* if (e?.currentTarget?.style?.border) */
                    e.currentTarget.style.border = "solid 5px yellow";
                  }}
                >
                  <Text style={styles.buttonHeader}>{option?.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
      </View>
    );
  } else if (question?.type == "choice") {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <View key={question?.id}>
            <View style={styles.button}>
              <Text style={styles.buttonHeader}>{question?.question}</Text>
            </View>
            {question?.answers.map((option, key) => {
              return (
                <TouchableOpacity
                  style={
                    isAnswered
                      ? option?.answer === true
                        ? styles.correct
                        : styles.wrong
                      : styles.answer
                  }
                  key={key}
                  disabled={isAnswered}
                  onPress={(e) => {
                    handleSubmit(option?.answer);
                    e.currentTarget.style.border = "solid 5px yellow";
                  }}
                >
                  <Text style={styles.buttonHeader}>{option?.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
      </View>
    );
  } else if (question?.type == "multipleChoice") {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <View key={question?.id}>
            <View style={styles.button}>
              <Text style={styles.buttonHeader}>{question?.question}</Text>
            </View>
            {question?.answers.map((option, key) => {
              return (
                <TouchableOpacity
                  style={
                    isAnswered
                      ? option?.answer === true
                        ? styles.correct
                        : styles.wrong
                      : styles.answer
                  }
                  key={key}
                  disabled={isAnswered}
                  onPress={(e) => {
                    handleSubmit(option?.answer);
                    e.currentTarget.style.border = "solid 5px yellow";
                  }}
                >
                  <Text style={styles.buttonHeader}>{option?.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <View key={question?.id}>
            <View style={styles.button}>
              <Text style={styles.buttonHeader}>{question?.question}</Text>
            </View>
            {question?.answers.map((option, key) => {
              return (
                <TouchableOpacity
                  style={
                    isAnswered
                      ? option?.answer === true
                        ? styles.correct
                        : styles.wrong
                      : styles.answer
                  }
                  key={key}
                  disabled={isAnswered}
                  onPress={(e) => {
                    handleSubmit(option?.answer);
                    e.currentTarget.style.border = "solid 5px yellow";
                  }}
                >
                  <Text style={styles.buttonHeader}>{option?.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
      </View>
    );
  }
};

export default QuizScreen;

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
    backgroundColor: "rgb(116, 203, 116)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  wrong: {
    backgroundColor: "rgb(228, 82, 82)",
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
    margin: "auto",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "rgb(251, 187, 173)",
  },
  nextButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
