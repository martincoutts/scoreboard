import React from "react";
import { connect } from "react-redux";

const ErrorDiv = ({ standings }) => {
  const renderUserMessage = () => {
    if (standings.errorCode === 403) {
      return (
        <h3>
          Apologies, due to API limitations there doesn't seem to be any data on
          that competition, please select another.
        </h3>
      );
    } else if (standings.errorCode === 429) {
      return (
        <h3>
          Apologies, you have made too many requests, please try again later.
        </h3>
      );
    }
  };

  return (
    <div id="errorDiv">
      <div id="errorMessage">
        <h1>Sorry :(</h1>
        {renderUserMessage()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  standings: state.standings.standings,
});

export default connect(mapStateToProps)(ErrorDiv);
