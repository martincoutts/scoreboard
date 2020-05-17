import { combineReducers } from "redux";

import countries from "./reducers/countries";
import competitions from "./reducers/competitions";
import standings from "./reducers/table";

const rootReducer = combineReducers({
  countries,
  competitions,
  standings,
});

export default rootReducer;
