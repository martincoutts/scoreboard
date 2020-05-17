import { FETCH_COMPETITIONS } from "../actions/fetch";
import { FILTER_COMPETITIONS } from "../actions/filterCompetitions";

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

    default:
      return state;
  }
}
