import React from "react";

const CountrySelect = props => (
  <select className="form-control" id="countrySelect">
    {props.countries.map((country, index) => (
      <option key={index + 1} data-countrycode={country.countryCode}>
        {country.name}
      </option>
    ))}
  </select>
);

export default CountrySelect;
