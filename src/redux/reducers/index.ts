import { combineReducers } from "redux";
import { createRouterReducer } from "@lagunovsky/redux-react-router";
import { browserHistory } from "./history";
import auth from "./auth";
import hotel from "./hotel";
import room from "./room";
import customer from "./customer";
import booking from "./booking";
import admin from "./admin";
import dash from "./dash";

const rootReducer = combineReducers({
  router: createRouterReducer(browserHistory),
  auth,
  admin,
  hotel,
  room,
  customer,
  booking,
  dash,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
