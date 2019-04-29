import React from "react";
import { Table } from "react-bootstrap";

const ScoreboardTable = props => (
  <div className="table-responsive">
    {props.standings.length === 0 ? (
      <h3>Select A competition</h3>
    ) : (
      <Table id="scoreboardTable" responsive>
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
        <tbody>
          {props.standings.map((team, index) => (
            <tr key={index + 1}>
              <td>{team.position}</td>
              <td>
                <img src={team.team.crestUrl} />
                {team.team.name}
              </td>
              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              <td>{team.goalDifference}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
);

export default ScoreboardTable;
