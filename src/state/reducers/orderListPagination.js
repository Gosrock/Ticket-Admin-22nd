import {
  ORDERS_PENDING,
  ORDERS_SUCCESS,
  ORDERS_ERROR,
  SET_ORDER_STATUS,
  SET_ORDER_STATUS_ERROR,
  SET_FREE_ORDER,
  SET_FREE_ORDER_ERROR
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

    case SET_ORDER_STATUS:
      const stateUpdatedOrders = state.data.orderList.map(x => {
        if (x.id === action.payload.id) {
          return action.payload;
        }
        return x;
      });

      return {
        ...state,
        data: {
          total: state.data.total,
          currentPage: state.currentPage,
          orderList: stateUpdatedOrders
        },
        error: null
      };

    case SET_ORDER_STATUS_ERROR:
      return { ...state, error: null };

    case SET_FREE_ORDER:
      const freeUpdatedOrders = state.data.orderList.map(x => {
        if (x.id === action.payload.id) {
          return action.payload;
        }
        return x;
      });

      return {
        ...state,
        data: {
          total: state.data.total,
          currentPage: state.currentPage,
          orderList: freeUpdatedOrders
        },
        error: null
      };

    case SET_FREE_ORDER_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}
