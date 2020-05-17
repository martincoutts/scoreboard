import React, { useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Select } from "antd";

import {
  filterCountriesAction,
  filterCompetitionsAction,
  resetFilterCompetitions,
} from "../actions";

const { Option } = Select;

const CountrySelect = ({
  countries,
  competitions,
  filterCountriesAction,
  filterCompetitionsAction,
  filteredCountries,
  resetFilterCompetitions,
}) => {
  useEffect(() => {
    filterCountriesAction(countries, competitions);
  }, [countries, competitions]);

  const handleCountrySelect = (value, competitions) => {
    resetFilterCompetitions();
    filterCompetitionsAction(parseInt(value), competitions);
  };

  return (
    <Select
      className="form-control userSelect"
      id="countrySelect"
      onChange={(value) => handleCountrySelect(parseInt(value), competitions)}
      placeholder={"Select country"}
    >
      {filteredCountries.map((country, index) => (
        <Option key={index + 1} value={country.id}>
          {country.name}
        </Option>
      ))}
    </Select>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
  competitions: state.competitions.competitions,
  filteredCountries: state.countries.filteredCountries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      filterCountriesAction,
      filterCompetitionsAction,
      resetFilterCompetitions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect);
