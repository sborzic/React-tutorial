import React, { Component } from "react";
import GameBoard from "./board";
import vader from "../images/darth_vader.png";
import yoda from "../images/yoda.png";

class Game extends Component {
  state = {
    players: [
      { playerName: "player one", score: 0 },
      { playerName: "player two", score: 0 },
    ],
    currentPlayer: 1,
    winner: "",
    showSettings: false,
  };

  updateCurrentPlayer = () => {
    if (this.state.currentPlayer === 1) {
      this.setState({ currentPlayer: 2 });
    } else {
      this.setState({ currentPlayer: 1 });
    }
  };

  checkWinner = (fields) => {
    function addSum(iterator) {
      sum += fields[iterator].value;
    }
    let sum = 0;
    //check rows
    for (let i = 0; i <= 6; i += 3) {
      sum = 0;
      for (let j = i; j < i + 3; j++) {
        addSum(j);
      }
      this.whoWon(sum);
    }
    //check columns
    for (let i = 0; i <= 2; i++) {
      sum = 0;
      for (let j = i; j <= i + 6; j += 3) {
        addSum(j);
      }
      this.whoWon(sum);
    }
    //check accross
    sum = 0;
    for (let i = 0; i <= 9; i += 4) {
      addSum(i);
    }
    this.whoWon(sum);

    sum = 0;
    for (let i = 2; i <= 6; i += 2) {
      addSum(i);
    }
    this.whoWon(sum);
  };

  whoWon = (sum) => {
    let winner = "";
    if (sum === 9) {
      winner = "player1";
      this.setState({ winner });
      this.updatePlayerScore(winner);
    } else if (sum === 15) {
      winner = "player2";
      this.setState({ winner });
      this.updatePlayerScore(winner);
    } else if (sum === 37 || sum === 35) {
      console.log("draw");
    }
  };

  updatePlayerScore = (winner) => {
    let players = { ...this.state.players };
    if (winner === "player1") {
      players[0].score += 1;
      this.setState({ ...this.state.players, players });
    } else if (winner === "player2") {
      players[1].score += 1;
      this.setState({ ...this.state.players, players });
    }
    console.log(winner);
  };

  handleGameLogic = (fields) => {
    this.updateCurrentPlayer();
    this.checkWinner(fields);
    this.updatePlayerScore();
    console.log(this.state);
  };

  newGame = () => {
    this.setState({ winner: "", currentPlayer: 1 });
  };

  reset = () => {
    this.newGame();
    const players = this.state.players;
    players[0].score = 0;
    players[1].score = 0;
    this.setState({ players });
  };

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  };

  render() {
    return (
      <div>
        <div className="score-bar">
          <div className="player-one">
            <img src={vader} alt="" />
            <div className="points-box score-one">
              {this.state.players[0].score}
            </div>
          </div>
          <div className="player-two">
            <div className="points-box score-two">
              {this.state.players[1].score}
            </div>
            <img src={yoda} alt="" />
          </div>
        </div>
        <div className="game-wrapper">
          <div className="buttons-wrapper">
            <button onClick={this.toggleSettings}>settings</button>
            <div
              className={
                this.state.showSettings ? "settings-wrapper" : "hidden-settings"
              }
            >
              <div>
                <span>Player One Name</span>
                <input type="text" placeholder="player one name" />
                <span>Player Two Name</span>
                <input type="text" placeholder="player two name" />
                <button onClick="handleSubmit">submit</button>
              </div>
            </div>
          </div>
          <div className="game-board">
            <GameBoard
              handleNewGame={this.newGame}
              handleReset={this.reset}
              gameLogic={this.handleGameLogic}
              currentPlayer={this.state.currentPlayer}
              winner={this.state.winner}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
