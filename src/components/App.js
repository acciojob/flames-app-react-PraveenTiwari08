import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputval1: "",
      inputval2: "",
      result: "",
    };

    this.handleInput1 = this.handleInput1.bind(this);
    this.handleInput2 = this.handleInput2.bind(this);
    this.calculateRelationship = this.calculateRelationship.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleInput1(event) {
    this.setState({ inputval1: event.target.value });
  }

  handleInput2(event) {
    this.setState({ inputval2: event.target.value });
  }

  calculateRelationship() {
    const { inputval1, inputval2 } = this.state;
    if (!inputval1 || !inputval2) {
      this.setState({ result: "Please Enter valid input" });
      return;
    }

    let str1 = inputval1.split("");
    let str2 = inputval2.split("");

    // Create frequency maps for both strings
    const freqMap1 = {};
    const freqMap2 = {};

    str1.forEach(char => {
      freqMap1[char] = (freqMap1[char] || 0) + 1;
    });

    str2.forEach(char => {
      freqMap2[char] = (freqMap2[char] || 0) + 1;
    });

    // Remove common characters
    for (let char in freqMap1) {
      if (freqMap2[char]) {
        const commonCount = Math.min(freqMap1[char], freqMap2[char]);
        freqMap1[char] -= commonCount;
        freqMap2[char] -= commonCount;
      }
    }

    // Calculate remaining length
    const remainingLength1 = Object.values(freqMap1).reduce((a, b) => a + b, 0);
    const remainingLength2 = Object.values(freqMap2).reduce((a, b) => a + b, 0);
    const remainingLength = remainingLength1 + remainingLength2;
    const resultIndex = remainingLength % 6;

    const relationships = ["Siblings", "Friends", "Love", "Affection", "Marriage", "Enemy"];

    this.setState({ result: relationships[resultIndex] });
  }

  clear() {
    this.setState({ inputval1: "", inputval2: "", result: "" });
  }

  render() {
    return (
      <div id="main">
        <input
          data-testid="input1"
          value={this.state.inputval1}
          onChange={this.handleInput1}
        />
        <input
          data-testid="input2"
          value={this.state.inputval2}
          onChange={this.handleInput2}
        />
        <button
          data-testid="calculate_relationship"
          onClick={this.calculateRelationship}
        >
          C+R Future
        </button>
        <button data-testid="clear" onClick={this.clear}>
          Clear
        </button>
        <h3 data-testid="answer">{this.state.result}</h3>
      </div>
    );
  }
}

export default App;