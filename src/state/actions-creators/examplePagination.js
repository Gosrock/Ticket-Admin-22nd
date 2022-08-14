import axios from 'axios';
import {
  ORDERS_PENDING,
  ORDERS_SUCCESS,
  ORDERS_ERROR,
  STATE_CHANGE,
  STATE_CHANGE_ERROR,
  SET_FREE_TICKET,
  SET_FREE_TICKET_ERROR
} from '../action-types/orderListPagination';

export const examplePagination =
  ({ requestPage }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: ORDERS_PENDING });

      const response = await axios.get(
        'https://api.gosrock.band/v1/tickets/find?order=ASC&page=1&take=10'
      );

      const data = {
        total: response.data.data.meta.itemCount,
        currentPage: requestPage,
        orderList: response.data.data
      };

      dispatch({ type: ORDERS_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: ORDERS_ERROR, payload: '조회 실패' });
    }
  };
