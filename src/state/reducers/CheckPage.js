/* eslint-disable import/no-anonymous-default-export */
import {
  CHECKING_PENDING,
  CHECKING_SUCCESS,
  CHECKING_ERROR
} from '../action-types/CheckPage.js';

export default function (
  state = {
    data: {
      userUuid: ''
    },
    error: null,
    pending: false
  },
  action
) {
  switch (action.type) {
    case CHECKING_PENDING:
      return { ...state, data: action.payload, error: null, pending: true };
    case CHECKING_SUCCESS:
      return { ...state, data: action.payload, error: null, pending: false };
    case CHECKING_ERROR:
      return { ...state, data: [], error: action.payload, pending: false };
    default:
      return state;
  }
}
