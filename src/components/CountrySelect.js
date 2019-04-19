import React from "react";
import PropTypes from "prop-types";

class CountrySelect extends React.Component {
  render() {
    return (
      <select
        className="form-control"
        id="countrySelect"
        onChange={e => this.props.handleCountrySelect(e.target.value)}
      >
        {this.props.countries.map((country, index) => (
          <option key={index + 1} value={country.countryCode}>
            {country.name}
          </option>
        ))}
      </select>
    );
  }
}

CountrySelect.propTypes = {
  handleCountrySelect: PropTypes.func
};

export default CountrySelect;
