import axios from "axios";
import authApi from "../../apis/auth/auth.api";
import ErrorResponse from "../../apis/common/ErrorResponse";

import {
  SLACK_MESSAGE_PENDING,
  SLACK_MESSAGE_SUCCESS,
  SLACK_MESSAGE_FAIL,
} from "../action-types";

export const slackMessage =
  ({ phoneNumber, slackEmail }, callback) =>
  async (dispatch) => {
    try {
      dispatch({ type: SLACK_MESSAGE_PENDING });

      // {
      //   "phoneNumber": "01094768640",
      //   "slackEmail": "water0641@naver.com"
      // }

      const response = await authApi.requestSlackValidationNumber({
        phoneNumber,
        slackEmail,
      });

      console.log(response);

      dispatch({
        type: SLACK_MESSAGE_SUCCESS,
        payload: response.data.data.validationNumber,
      });

      callback();
    } catch (e) {
      dispatch({
        type: SLACK_MESSAGE_FAIL,
        payload: new ErrorResponse(e.response.data.error),
      });
    }
  };
