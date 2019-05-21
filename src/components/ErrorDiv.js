import React, { Component } from "react";

class ErrorDiv extends Component {
  renderUserMessage() {
    if (this.props.standings.errorCode === 403) {
      return (
        <h3>
          Apologies, there doesn't seem to be any data on that competition,
          please select another.
        </h3>
      );
    } else if (this.props.standings.errorCode === 429) {
      return (
        <h3>
          Apologies, you have made too many requests, please try again later.
        </h3>
      );
    }
  }

  render() {
    return (
      <div id="errorDiv">
        <div id="errorMessage">
          <h1>Sorry :(</h1>
          {this.renderUserMessage()}
        </div>
      </div>
    );
  }
}

export default ErrorDiv;
