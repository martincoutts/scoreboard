import React from "react";

const ErrorDiv = props => (
  <div id="errorDiv">
    <h3>{props.standings.errorCode}</h3>
    <span>{props.standings.message}</span>
  </div>
);

export default ErrorDiv;
