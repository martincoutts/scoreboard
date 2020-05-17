import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchCountries, fetchCompetitions } from "../actions/fetch";

import "../index.scss";
import Header from "./Header";
import CountrySelect from "./CountrySelect";
import CompetitionSelect from "./CompetitionSelect";
import ErrorDiv from "./ErrorDiv";
import ScoreboardDiv from "./ScoreboardDiv";

const App = ({ fetchCountries, fetchCompetitions, standings }) => {
  useEffect(() => {
    fetchCompetitions();
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <Header />
      <CountrySelect />
      <CompetitionSelect />
      {standings.errorCode || standings.error ? (
        <ErrorDiv />
      ) : (
        <ScoreboardDiv />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ standings: state.standings });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCountries, fetchCompetitions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
