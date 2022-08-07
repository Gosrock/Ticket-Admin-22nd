import {
  USER_PAGE_PENDING,
  USER_PAGE_SUCCESS,
  USER_PAGE_ERROR,
  SEARCH_OPTION_UPDATE,
  SEARCH_OPTION_UPDATE_ERROR
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
    pending: false,
    option: {
      searchOption: 'searchName',
      searchString: ''
    }
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
          userList: [],
          searchOption: '',
          searchString: ''
        },
        error: action.payload,
        pending: false
      };
    case SEARCH_OPTION_UPDATE:
      return {
        ...state,
        option: action.payload,
        error: null,
        pending: false
      };
    case SEARCH_OPTION_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    default:
      return state;
  }
}
