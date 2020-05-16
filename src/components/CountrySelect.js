import React from "react";

import { connect } from "react-redux";

const CountrySelect = ({ countries }) => {
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

const mapStateToProps = (state) => ({ countries: state.countries.countries });

export default connect(mapStateToProps)(CountrySelect);
