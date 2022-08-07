import {
  ORDERS_PENDING,
  ORDERS_SUCCESS,
  ORDERS_ERROR,
  SET_ORDER_STATUS,
  SET_ORDER_STATUS_ERROR,
  SET_FREE_TICKET,
  SET_FREE_TICKET_ERROR
} from '../action-types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = {
    data: {
      totalPage: 0,
      currentPage: 1,
      orderList: []
    },
    error: null,
    pending: false
  },
  action
) {
  switch (action.type) {
    case ORDERS_PENDING:
      return { ...state, data: action.payload, error: null, pending: true };
    case ORDERS_SUCCESS:
      return { ...state, data: action.payload, error: null, pending: false };
    case ORDERS_ERROR:
      return { ...state, data: [], error: action.payload, pending: false };
    default:
      return state;
  }
}
