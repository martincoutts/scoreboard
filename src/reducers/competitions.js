import { FETCH_COMPETITIONS } from "../actions";
import { FILTER_COMPETITIONS } from "../actions";
import { RESET_FILTER_COMPETITIONS } from "../actions";

const initialState = {
  competitions: [],
  isCompetitionsLoaded: false,
  filteredCompetitions: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COMPETITIONS:
      return {
        ...state,
        competitions: payload,
        isCompetitionsLoaded: true,
      };
    case FILTER_COMPETITIONS:
      return {
        ...state,
        filteredCompetitions: payload,
      };
    case RESET_FILTER_COMPETITIONS:
      return {
        ...state,
        filteredCompetitions: [],
      };

    default:
      return state;
  }
}
