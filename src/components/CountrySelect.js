import React, { useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { filterCountriesAction, filterCompetitionsAction } from "../actions";

const CountrySelect = ({
  countries,
  competitions,
  filterCountriesAction,
  filterCompetitionsAction,
  filteredCountries,
}) => {
  useEffect(() => {
    filterCountriesAction(countries, competitions);
  }, [countries, competitions]);

  return (
    <select
      className="form-control userSelect"
      id="countrySelect"
      onChange={(e) =>
        filterCompetitionsAction(parseInt(e.target.value), competitions)
      }
    >
      {filteredCountries.map((country, index) => (
        <option key={index + 1} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
  competitions: state.competitions.competitions,
  filteredCountries: state.countries.filteredCountries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { filterCountriesAction, filterCompetitionsAction },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect);
