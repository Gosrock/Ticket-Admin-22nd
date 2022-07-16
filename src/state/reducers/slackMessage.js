import {
  SLACK_MESSAGE_PENDING,
  SLACK_MESSAGE_SUCCESS,
  SLACK_MESSAGE_FAIL,
} from "../action-types";
const INITIAL_STATE = {
  testValidationNumber: null,
  error: null,
  pending: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SLACK_MESSAGE_PENDING:
      return {
        ...state,
        testValidationNumber: null,
        pending: true,
        error: null,
      };
    case SLACK_MESSAGE_SUCCESS:
      return {
        ...state,
        testValidationNumber: action.payload,
        pending: false,
        error: null,
      };
    case SLACK_MESSAGE_FAIL:
      return {
        ...state,
        testValidationNumber: null,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
