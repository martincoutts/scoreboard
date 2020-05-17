import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const CompetitionSelect = ({ filteredCompetitions }) => {
  return (
    <select
      className="form-control userSelect"
      id="competitionSelect"
      // onChange={(e) => this.props.handleCompetitionSelect(e.target.value)}
    >
      {filteredCompetitions.length === 0 ? (
        <option>Select A Competition</option>
      ) : (
        filteredCompetitions.map((competition, index) => (
          <option key={index + 1} value={competition.id}>
            {competition.name}
          </option>
        ))
      )}
    </select>
  );
};

const mapStateToProps = (state) => ({
  filteredCompetitions: state.competitions.filteredCompetitions,
});

export default connect(mapStateToProps)(CompetitionSelect);
