import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  startAt,
  limit,
  orderBy,
  documentId,
  where,
} from "firebase/firestore";
import { Choice, Matrix, MultipleChoice } from "../components/Questions";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import "react-native-reanimated";
import Loader from "react-native-three-dots-loader";

let Index = 0;

const QuizScreen = ({ route }) => {
  const navigation = useNavigation();

  const { count, type } = route.params;

  // const collectionRef = collection(db, "Otázky");

  const [isLoading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [answers, setAnswers] = useState([]);

  async function getLastIndex(dbObject, collectionName) {
    const queryHandler = query(
      collection(dbObject, collectionName),
      orderBy("index", "desc"),
      limit(1)
    );
    const data = await getDocs(queryHandler);
    if (data.docs.length == 0) throw Error("Incorrect query");
    return data.docs[0].data().index;
  }
  const getQuiz = async () => {
    const quiz = [];
    const lastIdx = await getLastIndex(db, "Otázky");
    let usedIndexes = [];
    let randomIdx = 0;
    let question = {};

    for (let index = 0; index < count; index++) {
      while (true) {
        if (question.docs && question.docs.length != 0) break;
        randomIdx = Math.floor(Math.random() * lastIdx);
        if (!usedIndexes.includes(randomIdx)) {
          const conditions = [where("index", "==", randomIdx)];
          if (type.toLowerCase() !== "zmiešané") {
            conditions.push(where("topicType", "==", type.toLowerCase()));
          }
          question = await getDocs(
            query(collection(db, "Otázky"), ...conditions, limit(1))
          );
          usedIndexes.unshift(randomIdx);
        }
      }
      question = question.docs[0];
      quiz.push({ ...question.data(), questionId: question.id });
    }

    console.log(quiz);
    setQuiz(quiz);
    setCurrentQuestion(quiz[0]);
    setLoading(false);
  };

  useEffect(() => {
    Index = 0;
    getQuiz();
    navigation.setOptions({
      title: "Kvíz",
      headerStyle: {
        backgroundColor: "#FBBBAD",
      },
    });
  }, [navigation]);

  function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function () {
      if (copy.length < 1) {
        copy = array.slice(0);
      }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }

  function createQuiz(availableQuestions) {
    const quiz = [];

    let chooser = randomNoRepeats(availableQuestions);
    for (let i = 0; i < count; i++) {
      let question = chooser();

      if (type === "zmiešané") {
        quiz.push(question);
      } else {
        if (question.topicType.toLowerCase() === type.toLowerCase()) {
          if (question.type.toLowerCase() === "matrix") {
            quiz.push(question);
          }
        } else {
          while (true) {
            if (question.topicType.toLowerCase() === type.toLowerCase()) {
              if (question.type.toLowerCase() === "matrix") break;
            }
            question = chooser();
          }
          quiz.push(question);
        }
      }
    }

    /* console.log(quiz); */

    setQuiz(quiz);
    setCurrentQuestion(quiz[0]);
    setLoading(false);
  }

  function shuffleOptions(array) {
    let currentIndex = array.length;
    let randomIndex;

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
    /* console.log(answer); */
    setAnswers((prevAnswers) => [
      ...prevAnswers,
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
    if (currentQuestion.type === "matrix") {
      currentQuestion.options.left = shuffleOptions(
        currentQuestion.options.left
      );
      currentQuestion.options.right = shuffleOptions(
        currentQuestion.options.right
      );
    } else currentQuestion.answers = shuffleOptions(currentQuestion.answers);

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
      return <Matrix options={currentQuestion.options} />;
    }
  }

  function calculateScore() {
    let score = 0;

    answers.forEach((answer) => {
      if (
        answer.question.type === "trueFalse" ||
        answer.question.type === "choice"
      ) {
        if (answer.userAnswer.answer === true) score++;
      }
      if (answer.question.type === "multipleChoice") {
        if (!answer.userAnswer.some((obj) => obj.answer === false)) {
          let selectedCount = answer.userAnswer.length;
          let correctCount = answer.question.answers.filter(
            (obj) => obj.answer === true
          ).length;
          let correctSelectedCount = answer.userAnswer.filter(
            (obj) => obj.answer === true
          ).length;
          if (
            selectedCount === correctCount &&
            correctCount === correctSelectedCount
          )
            score++;
          /* else score += (1 / correctCount) * selectedCount; */
        }
      }
    });

    return score;
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {<Loader />}
      </View>
    );
  }

  if (Index === quiz.length - 1) {
    /* console.log(answers); */

    let score = calculateScore();

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <View style={styles.progressBar}>
          <AnimatedCircularProgress
            size={150}
            width={15}
            fill={Math.round((score / answers.length) * 100)}
            tintColor="#2ecc71"
            backgroundColor="#c5c9c9"
          >
            {(fill) => (
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                {Math.round((score / answers.length) * 100) + " %"}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <Text style={styles.finalText}>
          Správne {score} z {answers.length} otázok
          {/* 
          
          Pripočítavanie skóre 
          
          */}
          {(() => {
            getDoc(doc(db, "Používatelia", auth.currentUser.uid)).then(
              (document) =>
                setDoc(doc(db, "Používatelia", auth.currentUser.uid), {
                  ...document.data(),
                  points: document.data().points + score,
                })
            );
          })()}
        </Text>

        {/* 
        
          Vypis dat - porovnanie odpovedi / spravnych odpovedi, zhodnotenie po skonceni kvizu

        */}

        <ScrollView>
          {answers.map((answer, key) => {
            return (
              <View
                style={{
                  backgroundColor: "#E1E1E1",
                  padding: 15,
                  borderRadius: 10,
                  alignItems: "center",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginVertical: 10,
                  width: 275,
                  alignContent: "center",
                }}
                key={key}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginHorizontal: 20,
                    width: 250,
                  }}
                >
                  {key + 1 + ". " + answer.question.question}
                </Text>
                <View
                  style={{
                    backgroundColor: (() => {
                      if (answer.question.type === "multipleChoice") {
                        //Change Background color of user answers based on correctness (multipleChoice)
                        let selectedCount = answer.userAnswer.length;
                        let correctCount = answer.question.answers.filter(
                          (obj) => obj.answer === true
                        ).length;
                        let correctSelectedCount = answer.userAnswer.filter(
                          (obj) => obj.answer === true
                        ).length;
                        if (
                          selectedCount === correctCount &&
                          correctCount === correctSelectedCount
                        )
                          return "#2ecc71";
                        else return "#f1f57f";
                      }
                      //Change Background color of user answers based on correctness (TrueFalse or Single Choice)
                      else
                        return answer.userAnswer.answer == true
                          ? "#2ecc71"
                          : "#FF7F7F";
                    })(),
                    marginTop: 5,
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  {answer.question.type === "multipleChoice" ? (
                    <Text style={{ alignSelf: "center" }}>Tvoje odpovede:</Text>
                  ) : (
                    <Text style={{ alignSelf: "center" }}>Tvoja odpoveď: </Text>
                  )}
                  {answer.question.type === "multipleChoice" ? (
                    answer.userAnswer.map((multipleAnswer, key) => {
                      return (
                        <View key={key}>
                          <View>
                            <Text style={{ alignSelf: "center" }}>
                              {multipleAnswer.text}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <View>
                      <Text style={{ alignSelf: "center" }}>
                        {answer.userAnswer.text}
                      </Text>
                    </View>
                  )}
                </View>
                {answer.question.type === "multipleChoice" ? (
                  <Text style={{ alignSelf: "center" }}>Správne odpovede:</Text>
                ) : (
                  <Text style={{ alignSelf: "center" }}>Správna odpoveď: </Text>
                )}
                {answer.question.answers
                  .filter((filteredAnswer) => filteredAnswer.answer === true)
                  .map((filtered, key) => (
                    <View key={key}>
                      <Text style={{ alignSelf: "center" }}>
                        {filtered.text}
                      </Text>
                    </View>
                  ))}
              </View>
            );
          })}
        </ScrollView>

        <Pressable
          style={styles.finishButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.nextButtonText}>Ukončiť</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.buttonContainer}>
        <View key={currentQuestion?.id}>
          <View style={[styles.button, styles.questionBox]}>
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
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 20,
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
  questionBox: {
    borderColor: "#FBBBAD",
    borderBottomWidth: 2,
  },
  finalText: {
    fontWeight: "400",
    fontSize: 32,
    marginTop: 15,
  },
  progressBar: {
    marginTop: 25,
  },
  finishButton: {
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "rgb(251, 187, 173)",
  },
  question: {
    color: "black",
    fontSize: 32,
  },
});
