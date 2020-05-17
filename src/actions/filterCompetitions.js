import { filterCompetitions } from "../functions/filterCompetitions";

export const FILTER_COMPETITIONS = "FILTER_COMPETITIONS";
export const RESET_FILTER_COMPETITIONS = "RESET_FILTER_COMPETITIONS";

export const resetFilterCompetitions = () => {
  return function (dispatch) {
    return dispatch({ type: RESET_FILTER_COMPETITIONS });
  };
};

export const filterCompetitionsAction = (id, competitions) => {
  return function (dispatch) {
    const filteredCompetitions = filterCompetitions(id, competitions);

    return dispatch({
      type: FILTER_COMPETITIONS,
      payload: filteredCompetitions,
    });
  };
};
