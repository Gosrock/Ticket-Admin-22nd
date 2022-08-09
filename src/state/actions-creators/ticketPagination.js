import axios from 'axios';
import {
  TICKET_PAGINATION_PENDING,
  TICKET_PAGINATION_SUCCESS,
  TICKET_PAGINATION_ERROR,
  STATE_CHANGE,
  STATE_CHANGE_ERROR
} from '../action-types';

export const ticketPagination =
  ({ requestPage }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: TICKET_PAGINATION_PENDING });

      const response = await axios.get(
        `https://api.gosrock.band/v1/tickets/find?&order=DESC&page=${requestPage}&take=10`
      );
      console.log(response.data);

      const data = {
        total: response.data.data.meta.itemCount,
        currentPage: requestPage,
        ticketList: response.data.data.data
      };

      dispatch({ type: TICKET_PAGINATION_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: TICKET_PAGINATION_ERROR, payload: '조회 실패' });
    }
  };

export const changeState =
  ({ id, e }, message) =>
  async dispatch => {
    try {
      message.config({ maxCount: 1 });
      message.loading(`${id} 상태 ${e}으로 처리중`);
      // console.log('ticketId:', id);
      // console.log('status:', e);

      const response = await axios.patch(
        `https://api.gosrock.band/v1/tickets/status`,
        { ticketId: id, status: e }
      );
      console.log(response.data);
      // message.destory();
      message.success(`${id}티켓 상태 ${e}으로 변경 성공`);

      dispatch({ type: STATE_CHANGE, payload: response.data.data });
    } catch (e) {
      console.log(e);
      dispatch({
        type: STATE_CHANGE_ERROR,
        payload: e.response.data
      });
    }
  };

export const ticketPagi =
  ({ requestVal }, { page }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: TICKET_PAGINATION_PENDING });

      const response = await axios.get(
        `https://api.gosrock.band/v1/tickets/find`,
        {
          params: {
            date: requestVal,
            order: 'DESC',
            page: page,
            take: 10
          }
        }
      );
      console.log(response.data);

      const data = {
        total: response.data.data.meta.itemCount,
        currentPage: page,
        ticketList: response.data.data.data
      };

      dispatch({ type: TICKET_PAGINATION_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: TICKET_PAGINATION_ERROR, payload: '조회 실패' });
    }
  };
