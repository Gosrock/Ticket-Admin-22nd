import axios from 'axios';
import AuthApi from '../../apis/auth/AuthApi';

import ErrorResponse from '../../apis/common/ErrorResponse';
import TicketsApi from '../../apis/tickets/TicketsApi';

import {
  SLACK_VALIDATION_PENDING,
  SLACK_VALIDATION_SUCCESS,
  SLACK_VALIDATION_FAIL
} from '../action-types';

export const slackValidation =
  ({ phoneNumber, slackEmail, validationNumber }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: SLACK_VALIDATION_PENDING });

      const response = await AuthApi.validationSlackNumber({
        phoneNumber,
        slackEmail,
        validationNumber
      });

      const adminAccessToken = response.data.data.accessToken;
      localStorage.setItem('accessToken', adminAccessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${adminAccessToken}`;
      dispatch({
        type: SLACK_VALIDATION_SUCCESS,
        payload: response.data.data
      });

      // 나중에 api instance 가 늘어났다 이거 설정 해줘야함!!!

      TicketsApi.changeInstanceDefaultHeaders(adminAccessToken);

      callback();
    } catch (e) {
      //400 ~
      alert(e.response.data.message);
      dispatch({
        type: SLACK_VALIDATION_FAIL,
        payload: new ErrorResponse(e.response.data.error)
      });
    }
  };
