import React, { Component } from "react";
import "./index.scss";
import Header from "./components/Header";
import CountrySelect from "./components/CountrySelect";
import CompetitionSelect from "./components/CompetitionSelect";
import ErrorDiv from "./components/ErrorDiv";
import ScoreboardDiv from "./components/ScoreboardDiv";
import Table from "./components/Table";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CountrySelect />
        <CompetitionSelect />
        <ErrorDiv />
        <ScoreboardDiv />
        <Table />
      </div>
    );
  }
}

export default App;
