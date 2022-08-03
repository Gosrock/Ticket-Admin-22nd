import {
  TICKET_PAGINATION_PENDING,
  TICKET_PAGINATION_SUCCESS,
  TICKET_PAGINATION_ERROR,
  STATE_CHANGE,
  STATE_CHANGE_ERROR
} from '../action-types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = {
    data: {
      totalPage: 0,
      currentPage: 1,
      ticketList: []
    },
    error: null,
    pending: false
  },
  action
) {
  switch (action.type) {
    // case USER_STATE_TO_STOP_SUCCESS:
    //   // 해당 변경된 아이디를 찾아서 정보를 변경합니다.
    //   console.log("asdfasdfadsfas", action.payload);
    //   const newUserList = state.data.userList.map((element) => {
    //     if (element._id === action.payload._id) {
    //       console.log("find", element._id);
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
    //       console.log("find", element._id);
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
    case TICKET_PAGINATION_PENDING:
      return { ...state, data: action.payload, error: null, pending: true };
    case TICKET_PAGINATION_SUCCESS:
      return { ...state, data: action.payload, error: null, pending: false };
    case TICKET_PAGINATION_ERROR:
      return { ...state, data: [], error: action.payload, pending: false };
    case STATE_CHANGE:
      const newTicketList = state.ticketInfo.ticketList.map(element => {
        if (element._id === action.payload._id) {
          return action.payload;
        }
        return element;
      });

      return {
        ...state,
        ticketInfo: {
          totalResultCount: state.ticketInfo.totalResultCount,
          ticketList: newTicketList
        },
        errorMessage: null
      };
    case STATE_CHANGE_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message
      };

    default:
      return state;
  }
}
