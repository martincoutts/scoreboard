import { combineReducers } from "redux";

import countries from "./reducers/countries";

const rootReducer = combineReducers({
  countries,
});

export default rootReducer;
