import React from "react";
import { Table } from "react-bootstrap";

const ScoreboardTable = props => (
  <div className="table-responsive">
    {props.standings.length === 0 || props.standings.errorCode ? (
      <h3>Select A Competition</h3>
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
          {props.standings.standings[0].table.map((team, index) => (
            <tr key={index + 1}>
              <td>{team.position}</td>
              <td>
                <img src={team.team.crestUrl} alt="team logo" />
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
