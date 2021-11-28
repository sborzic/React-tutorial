import { Component } from "react";
import "../App.css";
import Field from "./field";
import vader from "../images/darth_vader.png";
import yoda from "../images/yoda.png";

class GameBoard extends Component {
  state = {
    fields: [
      { id: 1, value: 0, isPlayed: false, src: "" },
      { id: 2, value: 0, isPlayed: false, src: "" },
      { id: 3, value: 0, isPlayed: false, src: "" },
      { id: 4, value: 0, isPlayed: false, src: "" },
      { id: 5, value: 0, isPlayed: false, src: "" },
      { id: 6, value: 0, isPlayed: false, src: "" },
      { id: 7, value: 0, isPlayed: false, src: "" },
      { id: 8, value: 0, isPlayed: false, src: "" },
      { id: 9, value: 0, isPlayed: false, src: "" },
    ],
  };

  handleTurn = (fieldId) => {
    this.updateTable(fieldId);
    this.props.gameLogic(this.state.fields);
  };

  updateTable = (fieldId) => {
    const fields = this.state.fields;
    const src = this.props.currentPlayer === 1 ? vader : yoda;
    const value = this.props.currentPlayer === 1 ? 3 : 5;
    const selected = fields[fieldId - 1]; //index calculated based on ID
    selected.isPlayed = !selected.isPlayed;
    selected.src = src;
    selected.value = value;
    this.setState({ fields: fields });
  };

  newGame = () => {
    let clearedFields = this.state.fields.map((field) => {
      field.isPlayed = false;
      field.value = 0;
      field.src = "";
      return field;
    });

    this.setState({ fields: clearedFields });
    this.props.handleNewGame();
  };

  resetGame = () => {
    this.newGame();
    this.props.handleReset();
  };

  render() {
    console.log(this.state);
    return (
      <div className="board-wrapper">
        <div className="buttons-wrapper">
          <button onClick={this.newGame}>new game</button>
          <button onClick={this.resetGame}>reset</button>
        </div>

        <div className="board">
          {this.state.fields.map((field) => (
            <Field
              onPlay={this.handleTurn}
              key={field.id}
              data={field}
              winner={this.props.winner}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GameBoard;
