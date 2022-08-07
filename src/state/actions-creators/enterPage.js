import {
  ENTER_PAGE_PENDING,
  ENTER_PAGE_SUCCESS,
  ENTER_PAGE_ERROR
} from '../action-types';

export const enterPage =
  ({ data, enterTime }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: ENTER_PAGE_PENDING });

      const enterData = {
        ticketData: data,
        enterTime: enterTime
      };

      dispatch({ type: ENTER_PAGE_SUCCESS, payload: enterData });

      console.log('enterPage data', data);
    } catch (e) {
      dispatch({ type: ENTER_PAGE_ERROR, payload: '입장실패' });
    }
  };
