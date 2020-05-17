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

// const fetchCountries = () => {
//   fetch("https://api.football-data.org/v2/areas", {
//     headers: {
//       "X-Auth-Token": "d565497f7275426097c945923bac37d9",
//     },
//   })
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         this.setState({
//           countries: result.areas,
//         });
//       },
//       // Note: it's important to handle errors here
//       // instead of a catch block so that we don't swallow
//       // exceptions from actual bugs in components.
//       (error) => {
//         this.setState({
//           isLoaded: true,
//           error,
//         });
//       }
//     );
// };

// const fetchCompetitions = () => {
//   fetch("https://api.football-data.org/v2/competitions", {
//     headers: {
//       "X-Auth-Token": "d565497f7275426097c945923bac37d9",
//     },
//   })
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         this.setState({
//           competitions: result.competitions,
//         });
//       },
//       // Note: it's important to handle errors here
//       // instead of a catch block so that we don't swallow
//       // exceptions from actual bugs in components.
//       (error) => {
//         this.setState({
//           isLoaded: true,
//           error,
//         });
//       }
//     );
// };

const fetchTable = (compId) => {
  fetch(`https://api.football-data.org/v2/competitions/${compId}/standings`, {
    headers: {
      "X-Auth-Token": "d565497f7275426097c945923bac37d9",
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        this.setState({
          standings: result,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
};

// const handleCountrySelect = (value) => {
//   this.setState({ selectedCountryId: value }, () => this.filterCompetitions());
// };

const handleCompetitionSelect = (value) => {
  this.setState({ selectedCompetitionId: "" });
  this.setState({ selectedCompetitionId: parseInt(value) });
  this.fetchTable(parseInt(value));
};

// const filterCompetitions = () => {
//   let selectedCountryId = parseInt(this.state.selectedCountryId);
//   let filteredCompetitions = this.state.competitions.filter(function (
//     competition
//   ) {
//     return competition.area.id === selectedCountryId;
//   });
//   this.setState({
//     filteredCompetitions,
//   });
// };

const App = ({ fetchCountries, fetchCompetitions }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     countries: [],
  //     competitions: [],
  //     selectedCountryId: "",
  //     filteredCompetitions: [],
  //     selectedCompetitionId: "",
  //     standings: [],
  //   };
  // };

  useEffect(() => {
    fetchCompetitions();
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <Header />
      <CountrySelect />
      <CompetitionSelect
      // filteredCompetitions={this.state.filteredCompetitions}
      // handleCompetitionSelect={handleCompetitionSelect}
      />
      {/* {this.state.standings.errorCode ? (
          <ErrorDiv standings={this.state.standings} />
        ) : (
          <ScoreboardDiv standings={this.state.standings} />
        )} */}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCountries, fetchCompetitions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
