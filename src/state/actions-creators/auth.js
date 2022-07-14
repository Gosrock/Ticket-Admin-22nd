import { AUTH_USER, AUTH_ERROR } from "../action-types";
import axios from "axios";
import history from "../../history";

export const login =
  ({ userId, password, adminValidationToken }, callback) =>
  async (dispatch) => {
    try {
      // dispatch({ type: AUTH });

      const response = await axios.post("/api/admin/account/login", {
        userId,
        password,
        adminValidationToken,
      });
      console.log("액션", response);

      dispatch({ type: AUTH_USER, payload: response.data });

      localStorage.setItem("adminAccessToken", response.data.data.accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.accessToken}`;

      // 자동으로 피쳐로 넘어가게끔

      history.push("/user/lookup");
    } catch (e) {
      //400 ~
      alert("로그인 실패");
      dispatch({ type: AUTH_ERROR, payload: "로그인 실패" });
    }
  };
