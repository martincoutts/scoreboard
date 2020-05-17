import { FETCH_COUNTRIES } from "../actions/fetch";
import { FILTER_COUNTRIES } from "../actions/filterCountries";

const initialState = {
  countries: [],
  isCountriesLoaded: false,
  filteredCountries: [],
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: payload,
        isCountriesLoaded: true,
      };
    case FILTER_COUNTRIES:
      console.log("payload", type, payload);
      return {
        ...state,
        filteredCountries: payload,
      };
    default:
      return state;
  }
}
