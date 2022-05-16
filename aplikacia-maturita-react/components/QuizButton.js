import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default class QuizButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: false };
  }

  switchIsSelectedState() {
    console.log(this.props);
    this.setState({ isSelected: !this.state.isSelected });
    this.render();
    this.props.changeIsAnswered();
    console.log(this.props.isAnswered);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={[
            this.state.isSelected ? styles.selectedButton : null,
            this.props.isAnswered
              ? this.props.buttonAnswer === true
                ? styles.correct
                : styles.wrong
              : styles.answer,
          ]}
          disabled={this.props.isAnswered}
          onPress={() => {
            this.switchIsSelectedState();
          }}
        >
          <Text style={styles.buttonHeader}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  answer: {
    backgroundColor: "#E1E1E1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  correct: {
    backgroundColor: "rgb(76, 145, 76)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  wrong: {
    backgroundColor: "rgb(186, 52, 52)",
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
  selectedButton: {
    shadowColor: "#FBBBAD",
    shadowRadius: 128,
    shadowOpacity: 1,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
