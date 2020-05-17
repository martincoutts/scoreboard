import { FETCH_TABLE } from "../actions/fetch";

const initialState = {
  standings: [],
  isStandingsLoaded: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TABLE:
      console.log("FETCH_TABLE", payload);
      return {
        ...state,
        standings: payload,
        isStandingsLoaded: true,
      };

    default:
      return state;
  }
}
