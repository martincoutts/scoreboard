import { combineReducers } from "redux";

import countries from "./reducers/countries";
import competitions from "./reducers/competitions";

const rootReducer = combineReducers({
  countries,
  competitions,
});

export default rootReducer;
