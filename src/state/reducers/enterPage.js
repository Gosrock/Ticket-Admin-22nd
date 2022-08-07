import {
  ENTER_PAGE_PENDING,
  ENTER_PAGE_SUCCESS,
  ENTER_PAGE_ERROR
} from '../action-types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = {
    enterData: {
      ticketData: null,
      enterTime: null
    },
    ticketList: [],
    pending: false,
    errorMessage: null
  },
  action
) {
  switch (action.type) {
    case ENTER_PAGE_PENDING:
      return {
        ...state,
        enterData: action.payload,
        error: null,
        pending: true
      };
    case ENTER_PAGE_SUCCESS:
      return {
        ...state,
        enterData: action.payload,
        ticketList: state.ticketList.concat(action.payload),
        error: null,
        pending: false
      };
    case ENTER_PAGE_ERROR:
      return {
        ...state,
        enterData: null,
        error: action.payload,
        pending: false
      };

    default:
      return state;
  }
}
