export const FETCH_COUNTRIES = "FETCH_COUNTRIES";
export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS";
export const FETCH_TABLE = "FETCH_TABLE";

export const fetchCountries = () => {
  return async function (dispatch) {
    const res = await fetch("https://api.football-data.org/v2/areas", {
      headers: {
        "X-Auth-Token": "d565497f7275426097c945923bac37d9",
      },
    });
    const countries = await res.json();

    return dispatch({
      type: FETCH_COUNTRIES,
      payload: countries.areas,
    });
  };
};

export const fetchCompetitions = () => {
  return async function (dispatch) {
    const res = await fetch("https://api.football-data.org/v2/competitions", {
      headers: {
        "X-Auth-Token": "d565497f7275426097c945923bac37d9",
      },
    });
    const competitions = await res.json();

    return dispatch({
      type: FETCH_COMPETITIONS,
      payload: competitions.competitions,
    });
  };
};

export const fetchTable = (compId) => {
  return async function (dispatch) {
    const res = await fetch(
      `https://api.football-data.org/v2/competitions/${compId}/standings`,
      {
        headers: {
          "X-Auth-Token": "d565497f7275426097c945923bac37d9",
        },
      }
    );
    const standings = await res.json();

    return dispatch({
      type: FETCH_TABLE,
      payload: standings,
    });
  };
};
