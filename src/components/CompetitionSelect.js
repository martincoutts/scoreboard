import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CompetitionSelect = ({ competitions }) => {
  return (
    <select
      className="form-control userSelect"
      id="competitionSelect"
      onChange={(e) => this.props.handleCompetitionSelect(e.target.value)}
    >
      {competitions.length === 0 ? (
        <option>Select A Competition</option>
      ) : (
        competitions.map((competition, index) => (
          <option key={index + 1} value={competition.id}>
            {competition.name}
          </option>
        ))
      )}
    </select>
  );
};

const mapStateToProps = (state) => ({
  competitions: state.competitions.competitions,
});

export default connect(mapStateToProps)(CompetitionSelect);
