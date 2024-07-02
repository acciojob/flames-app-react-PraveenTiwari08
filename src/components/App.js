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

    this.handleinput1 = this.handleinput1.bind(this);
    this.handleinput2 = this.handleinput2.bind(this);
    this.Future = this.Future.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleinput1(event) {
    this.setState({ inputval1: event.target.value });
  }

  handleinput2(event) {
    this.setState({ inputval2: event.target.value });
  }

  Future() {
    const { inputval1, inputval2 } = this.state;
    if(!inputval1 || !inputval2){
        this.setState({result:"please enter valid input"})
        return;
    }
    let str1 = inputval1.split("");
    let str2 = inputval2.split("");

    str1 = str1.filter((char)=>{
        const index = str2.indexOf(char);
        if(index !== -1){
            str1.splice(index,1);
            return false;
        }
        return true;
    });

    const remaininglength = str1.length + str2.length;
    const resultindex = remaininglength % 6;

    const relationships = ["Siblings", "Friends", "Love", "Affection", "Marriage", "Enemy"];
    
    this.setState({ result:relationships[resultindex] });
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
          onChange={this.handleinput1}
        />
        <input
          data-testid="input2"
          value={this.state.inputval2}
          onChange={this.handleinput2}
        />
        <button data-testid="calculate_relationship" onClick={this.Future}>
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
