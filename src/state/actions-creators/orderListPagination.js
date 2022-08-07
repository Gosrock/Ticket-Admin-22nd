import axios from 'axios';
import {
  ORDERS_PENDING,
  ORDERS_SUCCESS,
  ORDERS_ERROR,
  SET_ORDER_STATUS,
  SET_ORDER_STATUS_ERROR,
  SET_FREE_TICKET,
  SET_FREE_TICKET_ERROR
} from '../action-types';

export const orderListPagination =
  ({ requestPage }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: ORDERS_PENDING });

      // https://api.gosrock.band/v1/orders/find?status=%ED%99%95%EC%9D%B8%EB%8C%80%EA%B8%B0&selection=YB&searchName=%EC%A0%95%EC%83%81%ED%9B%88&isFree=false&order=ASC&page=1&take=10
      const response = await axios.get(
        `https://api.gosrock.band/v1/orders/find`
        // {
        //   params: {
        //     status: '',
        //     selection: '',
        //     searchName: '',
        //     isFree: '',
        //     order: '',
        //     page: 1,
        //     take: 10
        //   }
        // }
      );
      console.log('티켓 조회', response);

      const data = {
        total: response.data.data.meta.itemCount,
        currentPage: requestPage,
        orderList: response.data.data.data
      };

      dispatch({ type: ORDERS_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: ORDERS_ERROR, payload: '조회 실패' });
    }
  };

export const orderListReq =
  ({ page }, { selection }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: ORDERS_PENDING });

      // https://api.gosrock.band/v1/orders/find?status=%ED%99%95%EC%9D%B8%EB%8C%80%EA%B8%B0&selection=YB&searchName=%EC%A0%95%EC%83%81%ED%9B%88&isFree=false&order=ASC&page=1&take=10
      // https://api.gosrock.band/v1/orders/find?selection=YB&order=ASC&page=1&take=10
      const response = await axios.get(
        `https://api.gosrock.band/v1/orders/find`,
        {
          params: {
            selection: selection,
            order: 'DESC',
            page: page,
            take: 10
          }
        }
      );
      console.log('조건부 티켓 조회', response);

      const data = {
        total: response.data.data.meta.itemCount,
        currentPage: page,
        orderList: response.data.data.data
      };

      dispatch({ type: ORDERS_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: ORDERS_ERROR, payload: '조회 실패' });
    }
  };

export const orderStatusChange =
  ({ id, e }) =>
  async dispatch => {
    try {
      console.log('ID: ', id);
      console.log('STATUS: ', e);

      const intID = parseInt(id);
      console.log(intID);

      const response = await axios.patch(
        //https://api.gosrock.band/v1/orders/status + body
        `https://api.gosrock.band/v1/orders/status`,
        { orderId: intID, status: e }
      );
      console.log(response);

      dispatch({ type: SET_ORDER_STATUS, payload: response.data.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: SET_ORDER_STATUS_ERROR, payload: e.response.data });
    }
  };

export const orderPriceChange =
  ({ id, e }) =>
  async dispatch => {
    try {
      const response = await axios.patch(
        //https://api.gosrock.band/v1/orders/10007(params)/free
        `https://api.gosrock.band/v1/orders/${id}/free`
      );

      dispatch({ type: SET_FREE_TICKET, payload: response.data.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: SET_FREE_TICKET_ERROR, payload: e.response.data });
    }
  };
