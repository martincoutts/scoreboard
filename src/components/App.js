import React, { Component } from "react";
import "../index.scss";
import Header from "./Header";
import CountrySelect from "./CountrySelect";
import CompetitionSelect from "./CompetitionSelect";
import ErrorDiv from "./ErrorDiv";
import ScoreboardDiv from "./ScoreboardDiv";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      competitions: [],
      selectedCountryId: "",
      filteredCompetitions: [],
      selectedCompetitionId: "",
      standings: []
    };
  }

  componentDidMount() {
    this.fetchCountries();
    this.fetchCompetitions();
  }

  fetchCountries() {
    fetch("https://api.football-data.org/v2/areas", {
      headers: {
        "X-Auth-Token": "d565497f7275426097c945923bac37d9"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            countries: result.areas
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  fetchCompetitions() {
    fetch("https://api.football-data.org/v2/competitions", {
      headers: {
        "X-Auth-Token": "d565497f7275426097c945923bac37d9"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            competitions: result.competitions
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  fetchTable(compId) {
    fetch(`https://api.football-data.org/v2/competitions/${compId}/standings`, {
      headers: {
        "X-Auth-Token": "d565497f7275426097c945923bac37d9"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            standings: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleCountrySelect = value => {
    this.setState({ selectedCountryId: value }, () =>
      this.filterCompetitions()
    );
  };

  handleCompetitionSelect = value => {
    this.setState({ selectedCompetitionId: "" });
    this.setState({ selectedCompetitionId: parseInt(value) });
    this.fetchTable(parseInt(value));
  };

  filterCompetitions = () => {
    let selectedCountryId = parseInt(this.state.selectedCountryId);
    let filteredCompetitions = this.state.competitions.filter(function(
      competition
    ) {
      return competition.area.id === selectedCountryId;
    });
    this.setState({
      filteredCompetitions
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <CountrySelect
          countries={this.state.countries}
          handleCountrySelect={this.handleCountrySelect}
          filterCompetitions={this.filterCompetitions}
        />
        <CompetitionSelect
          filteredCompetitions={this.state.filteredCompetitions}
          handleCompetitionSelect={this.handleCompetitionSelect}
        />
        {this.state.standings.errorCode ? (
          <ErrorDiv standings={this.state.standings} />
        ) : (
          <ScoreboardDiv standings={this.state.standings} />
        )}
      </div>
    );
  }
}

export default App;
