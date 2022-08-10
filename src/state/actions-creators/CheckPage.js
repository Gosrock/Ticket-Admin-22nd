import axios from 'axios';
import {
  CHECKING_PENDING,
  CHECKING_SUCCESS,
  CHECKING_ERROR,
  CHECKING_COUNT
} from '../action-types/checkPage.js';
import { store } from '../storeSetting.js';

export const checkPage =
  ({ uuid }, { date }, message, callback) =>
  async dispatch => {
    const { checkPage } = store.getState();
    // console.log();
    if (uuid && checkPage.count > 4) {
      try {
        dispatch({ type: CHECKING_PENDING });

        const response = await axios.post(
          `https://api.gosrock.band/v1/tickets/${uuid}/enter`,
          {
            date: `${date}`
          }
        );
        console.log('서버 응답?', response);
        console.log('uuid, date: ', uuid, ',,,,', date);

        message.success('조회에 성공했습니다. 입장이 가능합니다.');
        dispatch({ type: CHECKING_SUCCESS, payload: '조회 성공' });

        // 자동으로 피쳐로 넘어가게끔
        callback();
      } catch (e) {
        //400 ~ 에러 타입에 따라서 경고메세지 다르게 표시
        // dispatch({ type: CHECKING_ERROR, payload: error });
        // console.log('ERROR: ', error.response.data.error.message);
        const ERROR = e.response.data.error.message;
        console.log('ERROR:', ERROR);
        message.warn(`${ERROR}`);
        dispatch({ type: CHECKING_ERROR, payload: e });
      }
    }
  };

export const checkCount = () => async dispatch => {
  dispatch({ type: CHECKING_COUNT });
};
