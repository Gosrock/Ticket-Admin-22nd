/* eslint-disable import/no-anonymous-default-export */
import { RANDOM_SUCCESS, RANDOM_ERROR } from '../action-types';

export default function (
  state = {
    randm: {
      _list: []
    },
    error: null
  },
  action
) {
  switch (action.type) {
    case RANDOM_SUCCESS:
      return { ...state, randm: action.payload, error: null };
    case RANDOM_ERROR:
      return { ...state, randm: [], error: action.payload };
    default:
      return state;
  }
}
