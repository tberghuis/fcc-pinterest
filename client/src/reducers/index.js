import { combineReducers } from "redux";
import user from "./user";
import view from "./view";
import pins from "./pins";

const reducer = combineReducers({
  user,
  view,
  pins
});

export default reducer;
