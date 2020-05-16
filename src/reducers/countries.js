import { FETCH_COUNTRIES } from "../actions/fetch";

const initialState = {
  countries: [],
  isCountriesLoaded: false,
  error: "",
};

export default function (state = initialState, action) {
  const { type, result } = action;
  switch (type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: result,
        isCountriesLoaded: true,
      };
    default:
      return state;
  }
}
