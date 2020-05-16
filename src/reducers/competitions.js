import { FETCH_COMPETITIONS } from "../actions/fetch";

const initialState = {
  competitions: [],
  isCompetitionsLoaded: false,
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
    default:
      return state;
  }
}
