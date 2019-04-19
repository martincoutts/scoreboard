import React, { Component } from "react";
import "../index.scss";
import Header from "./Header";
import CountrySelect from "./CountrySelect";
import CompetitionSelect from "./CompetitionSelect";
import ErrorDiv from "./ErrorDiv";
import ScoreboardDiv from "./ScoreboardDiv";
import Table from "./Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      competitions: [],
      selectedCountry: ""
    };
  }

  componentDidMount() {
    this.fetchCountries();
    this.fetchCompetitions();
  }

  fetchCountries() {
    fetch("http://api.football-data.org/v2/areas", {
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
    fetch("http://api.football-data.org/v2/competitions", {
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

  handleCountrySelect = value => {
    this.setState({ selectedCountry: value });
    console.log(value);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <CountrySelect
          countries={this.state.countries}
          handleCountrySelect={this.handleCountrySelect}
        />
        <CompetitionSelect />
        <ErrorDiv />
        <ScoreboardDiv />
        <Table />
      </div>
    );
  }
}

export default App;
