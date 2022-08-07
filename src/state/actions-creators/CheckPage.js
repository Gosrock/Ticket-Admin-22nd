import axios from 'axios';
import {
  CHECKING_PENDING,
  CHECKING_SUCCESS,
  CHECKING_ERROR
} from '../action-types/CheckPage.js';

export const checkPage =
  ({ requestPage }, { uuid }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: CHECKING_PENDING });

      const response = await axios.post(
        `https://api.gosrock.band/v1/tickets/${uuid}/enter`
      );
      console.log('서버 응답?', response);

      dispatch({ type: CHECKING_SUCCESS, payload: '조회 성공' });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: CHECKING_ERROR, payload: '조회 실패' });
    }
  };
