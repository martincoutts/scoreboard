import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTable } from "../actions";

import { Select } from "antd";
const { Option } = Select;

const CompetitionSelect = ({ filteredCompetitions, fetchTable }) => {
  return (
    <Select
      className="form-control userSelect"
      id="competitionSelect"
      onChange={(value) => fetchTable(parseInt(value))}
      placeholder={"Select competition"}
      disabled={filteredCompetitions.length === 0}
    >
      {filteredCompetitions.length === 0 ? (
        <Option>First select country</Option>
      ) : (
        filteredCompetitions.map((competition, index) => (
          <Option key={index + 1} value={competition.id}>
            {competition.name}
          </Option>
        ))
      )}
    </Select>
  );
};

const mapStateToProps = (state) => ({
  filteredCompetitions: state.competitions.filteredCompetitions,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchTable }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionSelect);
