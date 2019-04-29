import React from "react";
import { Table } from "react-bootstrap";

const ScoreboardTable = props => (
  <div className="table-responsive">
    {/* <Table id="scoreboardTable" responsive>
      <thead>
        <tr>
          <th>Position</th>
          <th>Team</th>
          <th>Games Played</th>
          <th>Won</th>
          <th>Drew</th>
          <th>Lost</th>
          <th>Goal Difference</th>
          <th>Points</th>
        </tr>
      </thead>
      {props.standings.length === 0 ? (
        <h3>Select A competition</h3>
      ) : (
        props.standings[0].table.map((team, index) => (
          <tr>
            <td>{team.team.name}</td>
          </tr>
        ))
      )}
    </Table> */}
  </div>
);

export default ScoreboardTable;
