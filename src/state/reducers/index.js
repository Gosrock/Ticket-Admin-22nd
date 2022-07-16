import { combineReducers } from "redux";
import { auth } from "./auth";
import slackMessage from "./slackMessage";

export default combineReducers({
  slackMessage: slackMessage,
  auth: auth,
});
