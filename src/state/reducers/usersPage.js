import {
  USER_PAGE_PENDING,
  USER_PAGE_SUCCESS,
  USER_PAGE_ERROR
} from '../action-types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = {
    data: {
      totalPage: 0,
      currentPage: 1,
      userList: []
    },
    error: null,
    pending: false
  },
  action
) {
  switch (action.type) {
    case USER_PAGE_PENDING:
      return { ...state, data: action.payload, error: null, pending: true };
    case USER_PAGE_SUCCESS:
      return { ...state, data: action.payload, error: null, pending: false };
    case USER_PAGE_ERROR:
      return {
        ...state,
        data: {
          totalPage: 0,
          currentPage: 1,
          userList: []
        },
        error: action.payload,
        pending: false
      };
    default:
      return state;
  }
}
