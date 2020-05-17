import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTable } from "../actions";

const CompetitionSelect = ({ filteredCompetitions, fetchTable }) => {
  return (
    <select
      className="form-control userSelect"
      id="competitionSelect"
      onChange={(e) => fetchTable(parseInt(e.target.value))}
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchTable }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionSelect);
