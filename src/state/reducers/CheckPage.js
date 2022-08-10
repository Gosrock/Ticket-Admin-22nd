/* eslint-disable import/no-anonymous-default-export */
import {
  CHECKING_PENDING,
  CHECKING_SUCCESS,
  CHECKING_ERROR,
  CHECKING_COUNT
} from '../action-types/checkPage.js';

export default function (
  state = {
    data: {
      userUuid: ''
    },
    error: null,
    pending: false,
    count: 0
  },
  action
) {
  switch (action.type) {
    case CHECKING_PENDING:
      return { ...state, data: action.payload, error: null, pending: true };
    case CHECKING_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        count: 0,
        pending: false
      };
    case CHECKING_ERROR:
      return {
        ...state,
        data: [],
        error: action.payload,
        count: 0,
        pending: false
      };
    case CHECKING_COUNT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
