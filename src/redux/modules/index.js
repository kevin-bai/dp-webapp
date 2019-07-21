import { combineReducers } from "redux";
import home from "./home";
import detail from "./detail";
import search from "./search";
import app from "./app";
import entities from "./entities";
import login from "./login";
import user from "./user";

const rootReducer = combineReducers({
  app,
  entities,
  home,
  detail,
  search,
  login,
  user
});

export default rootReducer;
