import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchCountries } from "../actions/fetch";

const CountrySelect = ({ countries, fetchCountries }) => {
  // const { fetchCountries, countries } = this.props;

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <select
      className="form-control userSelect"
      id="countrySelect"
      // onChange={(e) => handleCountrySelect(e.target.value)}
    >
      {countries.map((country, index) => (
        <option key={index + 1} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

// CountrySelect.propTypes = {
//   handleCountrySelect: PropTypes.func,
// };

const mapStateToProps = (state) => ({ countries: state.countries.countries });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchCountries }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect);
