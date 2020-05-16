export const FETCH_COUNTRIES = "FETCH_COUNTRIES";

export const fetchCountries = () => {
  return async function (dispatch) {
    const res = await fetch("https://api.football-data.org/v2/areas", {
      headers: {
        "X-Auth-Token": "d565497f7275426097c945923bac37d9",
      },
    });
    const countries = await res.json();
    console.log("countries", countries);
    return dispatch({
      type: "FETCH_COUNTRIES",
      result: countries.areas,
    });
  };
};
