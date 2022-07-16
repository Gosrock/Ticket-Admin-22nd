import { LOGOUT_USER } from "../action-types/logout";
import axios from "axios";
import history from "../../history";

export const logout = (callback) => async (dispatch) => {
  dispatch({ type: LOGOUT_USER });

  localStorage.setItem("accessToken", null);
  axios.defaults.headers.common.Authorization = null;

  // 자동으로 피쳐로 넘어가게끔
  history.push("/auth/login");

  callback();
};
