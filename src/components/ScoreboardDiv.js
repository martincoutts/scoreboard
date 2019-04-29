import React from "react";
import ScoreboardTable from "./ScoreboardTable";

const ScoreboardDiv = props => (
  <div id="scoreboardDiv" className="container-fluid">
    <ScoreboardTable standings={props.standings} />
  </div>
);

export default ScoreboardDiv;
