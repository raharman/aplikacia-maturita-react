import React, { useState } from "react";
import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { styles } from "../screens/QuizScreen";

const Answer = (props) => {
  function selectOption() {
    if (props.type === "Choice") {
      if (props.selected === props.answer) props.setSelected(null);
      else props.setSelected(props.answer);
    } else if (props.type === "MultipleChoice") {
      if (props.selected.includes(props.answer)) {
        props.setSelected(
          props.selected.filter((element) => element !== props.answer)
        );
        return;
      }

      props.setSelected([...props.selected, props.answer]);
    }
  }

  function checkSelected() {
    if (props.type === "Choice") {
      return props.selected === props.answer;
    } else if (props.type === "MultipleChoice") {
      return props.selected.includes(props.answer);
    }
  }

  return (
    <TouchableOpacity
      answer={props.answer.answer}
      style={[
        styles.button,
        checkSelected() ? { backgroundColor: "#FBBBAD" } : null,
      ]}
      onPress={
        props.hasOwnProperty("setSelected") ? () => selectOption() : null
      }
    >
      <Text
        style={[
          styles.answer,
          checkSelected() ? { backgroundColor: "#FBBBAD" } : null,
        ]}
      >
        {props.answer.text}
      </Text>
    </TouchableOpacity>
  );
};

export const Choice = (props) => {
  const [selected, setSelected] = useState(null);

  return (
    <View>
      {props.options.map((answer, key) => {
        return (
          <Answer
            type={"Choice"}
            answer={answer}
            key={key}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
      {selected ? (
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            props.updateAnswer(selected);
            props.handleNextQuestion();
            setSelected(false);
          }}
        >
          <Text style={styles.nextButtonText}>Ďalšia otázka</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export const MultipleChoice = (props) => {
  const [selected, setSelected] = useState([]);

  return (
    <View>
      {props.options.map((answer, key) => {
        return (
          <Answer
            type={"MultipleChoice"}
            answer={answer}
            key={key}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
      {selected.length !== 0 ? (
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            props.updateAnswer(selected);
            setSelected([]);
            props.handleNextQuestion();
          }}
        >
          <Text style={styles.nextButtonText}>Ďalšia otázka</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const MatrixAnswer = (props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.answer}> {props.text}</Text>
    </TouchableOpacity>
  );
};

export const Matrix = (props) => {
  const [selected, setSelected] = useState([]);

  const colors = [];

  for (let index = 0; index < props.options.left.length; index++) {
    //colors.push(Math.floor(Math.random() * 16777215).toString(16));
    colors.push(getRandomColor());
  }

  return props.options.left.map((answer, key) => {
    return (
      <View key={key}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View style={{ flex: 1, marginRight: 10 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log(answer.text)}
            >
              <Text style={styles.answer}>{answer.text}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.answer}>{props.options.right[key].text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  });
};

function handleMatrix(event) {
  console.log(event.target.dataset.text);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}
