import React from "react";
import { Table } from "react-bootstrap";

const ScoreboardTable = props => (
  <div className="table-responsive">
    {props.standings.length === 0 || props.standings.errorCode ? (
      <h3 id="competitionUserPrompt">Select A Competition</h3>
    ) : (
      <Table id="scoreboardTable">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th className="multiColumnCell">Games Played</th>
            <th className="multiColumnCell tabletLayoutCell">Won</th>
            <th className="multiColumnCell tabletLayoutCell">Drew</th>
            <th className="multiColumnCell tabletLayoutCell">Lost</th>
            <th className="multiColumnCell">Goal Difference</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {props.standings.standings[0].table.map((team, index) => (
            <tr className="tableRow" key={index + 1}>
              <td className="teamPositionCell">{team.position}</td>
              <td className="teamNameCell">
                <img
                  className="multiColumnCell"
                  src={team.team.crestUrl}
                  alt="team logo"
                />
                <p>{team.team.name}</p>
              </td>
              <td className="multiColumnCell">{team.playedGames}</td>
              <td className="multiColumnCell tabletLayoutCell">{team.won}</td>
              <td className="multiColumnCell tabletLayoutCell">{team.draw}</td>
              <td className="multiColumnCell tabletLayoutCell">{team.lost}</td>
              <td className="multiColumnCell">{team.goalDifference}</td>
              <td className="teamPointsCell">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
);

export default ScoreboardTable;
