/* eslint-disable import/no-anonymous-default-export */
import { LANDING_PAGE_SUCCESS, LANDING_PAGE_ERROR } from '../action-types';

export default function (
  state = {
    data: {
      totalTicket: 0,
      depositedTicket: 0,
      income: 0,
      doneOrder: 0,
      waitOrder: 0,
      expireOrder: 0,
      enteredTicket: 0,
      nonEnteredTicket: 0
    },
    error: null
  },
  action
) {
  switch (action.type) {
    case LANDING_PAGE_SUCCESS:
      return { ...state, data: action.payload, error: action.payload };
    case LANDING_PAGE_ERROR:
      return { ...state, data: [], error: action.payload };

    default:
      return state;
  }
}
