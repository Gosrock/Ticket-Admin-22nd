import axios from "axios";
import authApi from "../../apis/auth/auth.api";
import ErrorResponse from "../../apis/common/ErrorResponse";
import ticketsApi from "../../apis/tickets/tickets.api";
import {
  SLACK_VALIDATION_PENDING,
  SLACK_VALIDATION_SUCCESS,
  SLACK_VALIDATION_FAIL,
} from "../action-types";

export const slackValidation =
  ({ phoneNumber, slackEmail, validationNumber }, callback) =>
  async (dispatch) => {
    try {
      dispatch({ type: SLACK_VALIDATION_PENDING });

      const response = await authApi.validationSlackNumber({
        phoneNumber,
        slackEmail,
        validationNumber,
      });

      console.log(response.data.data);
      dispatch({
        type: SLACK_VALIDATION_SUCCESS,
        payload: response.data.data,
      });

      localStorage.setItem("accessToken", response.data.data.accessToken);
      axios.defaults.headers.common.Authorization =
        response.data.data.accessToken;
      // 나중에 api instance 가 늘어났다 이거 설정 해줘야함!!!
      ticketsApi.changeInstanceDefaultHeaders(response.data.data.accessToken);

      callback();
    } catch (e) {
      //400 ~
      console.log(e);
      alert(e.response.data.message);
      dispatch({
        type: SLACK_VALIDATION_FAIL,
        payload: new ErrorResponse(e.response.data.error),
      });
    }
  };
