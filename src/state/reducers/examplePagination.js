import {
  ORDERS_PENDING,
  ORDERS_SUCCESS,
  ORDERS_ERROR,
  STATE_CHANGE,
  STATE_CHANGE_ERROR,
  SET_FREE_TICKET,
  SET_FREE_TICKET_ERROR
} from '../action-types/orderListPagination';

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
    // case USER_STATE_TO_STOP_SUCCESS:
    //   // 해당 변경된 아이디를 찾아서 정보를 변경합니다.
    //   const newUserList = state.data.userList.map((element) => {
    //     if (element._id === action.payload._id) {
    //       return action.payload;
    //     }
    //     return element;
    //   });
    //   return {
    //     ...state,
    //     data: {
    //       userCount: state.data.userCount,
    //       totalPage: state.data.totalPage,
    //       currentPage: state.data.currentPage,
    //       userList: newUserList,
    //     },
    //     error: null,
    //   };
    // case USER_STATE_TO_NORMAL_SUCCESS:
    //   const newNORMALUserList = state.data.userList.map((element) => {
    //     if (element._id === action.payload._id) {
    //       return action.payload;
    //     }
    //     return element;
    //   });
    //   return {
    //     ...state,
    //     data: {
    //       userCount: state.data.userCount,
    //       totalPage: state.data.totalPage,
    //       currentPage: state.data.currentPage,
    //       userList: newNORMALUserList,
    //     },
    //     error: null,
    //   };
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
