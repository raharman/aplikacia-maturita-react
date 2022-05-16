import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Choice, Matrix, MultipleChoice } from "../components/Questions";

let Index = 0;

const QuizScreen = ({ route }) => {
  const navigation = useNavigation();

  const { title, quizId } = route.params;

  const collectionRef = collection(db, "Kvízy", quizId, "questions");

  const [isLoading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [answers, setAnswers] = useState([]);

  const getQuiz = async () => {
    const data = await getDocs(collectionRef);
    setQuiz(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setCurrentQuestion(data.docs[0].data());
    setLoading(false);
  };

  useEffect(() => {
    Index = 0;
    getQuiz();
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: "#FBBBAD",
      },
    });
  }, [navigation]);

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

  function updateAnswer(answer) {
    console.log(answer);
    setAnswers([
      ...answers,
      {
        question: currentQuestion,
        userAnswer: answer,
      },
    ]);
  }

  function handleNextQuestion() {
    Index = quiz.findIndex((obj) => obj.question === currentQuestion.question);
    if (Index < quiz.length - 1) setCurrentQuestion(quiz[Index + 1]);
  }

  function renderAnswers() {
    currentQuestion.answers = shuffleOptions(currentQuestion.answers);

    if (
      currentQuestion.type === "trueFalse" ||
      currentQuestion.type === "choice"
    ) {
      return (
        <Choice
          options={currentQuestion.answers}
          updateAnswer={(e) => updateAnswer(e)}
          handleNextQuestion={() => handleNextQuestion()}
        />
      );
    } else if (currentQuestion.type === "multipleChoice") {
      return (
        <MultipleChoice
          options={currentQuestion.answers}
          updateAnswer={(e) => updateAnswer(e)}
          handleNextQuestion={() => handleNextQuestion()}
        />
      );
    } else {
      return <Matrix options={currentQuestion.answers} />;
    }
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (Index === quiz.length - 1) {
    console.log(answers);
    return <Text>Ended</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <View key={currentQuestion?.id}>
          <View style={styles.button}>
            <Text style={styles.buttonHeader}>{currentQuestion?.question}</Text>
          </View>
          {renderAnswers()}
        </View>
      </View>
    </ScrollView>
  );
};

export default QuizScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
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
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    //marginVertical: 20,
    /*     marginRight: "auto",
    marginLeft: "auto", */
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
    marginHorizontal: 25,
  },
  selectedButton: {
    borderColor: "yellow",
    borderWidth: 2,
  },
});
