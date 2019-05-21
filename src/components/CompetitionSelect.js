import React from "react";
import PropTypes from "prop-types";

class CompetitionSelect extends React.Component {
  render() {
    return (
      <select
        className="form-control userSelect"
        id="competitionSelect"
        onChange={e => this.props.handleCompetitionSelect(e.target.value)}
      >
        {this.props.filteredCompetitions.length === 0 ? (
          <option>Select A Competition</option>
        ) : (
          this.props.filteredCompetitions.map((competition, index) => (
            <option key={index + 1} value={competition.id}>
              {competition.name}
            </option>
          ))
        )}
      </select>
    );
  }
}

CompetitionSelect.propTypes = {
  handleCompetitionSelect: PropTypes.func
};

export default CompetitionSelect;
