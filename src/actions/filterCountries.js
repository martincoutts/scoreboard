import { filterCountries } from "../functions/filterCountries";

export const FILTER_COUNTRIES = "FILTER_COUNTRIES";

export const filterCountriesAction = (countries, competitions) => {
  return function (dispatch) {
    const filteredCountries = filterCountries(countries, competitions);

    return dispatch({
      type: FILTER_COUNTRIES,
      payload: filteredCountries,
    });
  };
};
