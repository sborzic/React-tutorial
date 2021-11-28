import React, { Component } from "react";

class Field extends Component {
  render() {
    return (
      <div
        onClick={() =>
          !this.props.data.isPlayed
            ? !this.props.winner
              ? this.props.onPlay(this.props.data.id)
              : null
            : null
        }
        className="field"
      >
        <img src={this.props.data.src} alt="" />
      </div>
    );
  }
}

export default Field;
