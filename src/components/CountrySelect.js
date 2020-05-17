import React, { useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { filterCountriesAction } from "../actions/filterCountries";

const CountrySelect = ({
  countries,
  competitions,
  filterCountriesAction,
  filteredCountries,
}) => {
  useEffect(() => {
    filterCountriesAction(countries, competitions);
  }, [countries, competitions]);

  return (
    <select
      className="form-control userSelect"
      id="countrySelect"
      // onChange={(e) => handleCountrySelect(e.target.value)}
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
  bindActionCreators({ filterCountriesAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect);
