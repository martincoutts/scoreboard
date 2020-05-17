import { FETCH_TABLE } from "../actions/fetch";

const initialState = {
  standings: [],
  isStandingsLoaded: false,
  error: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TABLE:
      const error = payload.errorCode ? true : false;
      return {
        ...state,
        standings: payload,
        isStandingsLoaded: true,
        error,
      };

    default:
      return state;
  }
}
