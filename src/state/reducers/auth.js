import {
  LOGOUT_USER,
  SLACK_VALIDATION_PENDING,
  SLACK_VALIDATION_SUCCESS,
  SLACK_VALIDATION_FAIL,
} from "../action-types";

const INITIAL_STATE = {
  authenticated: false,
  accessToken: null,
  user: null,
  error: null,
  pending: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SLACK_VALIDATION_PENDING:
      return { ...state, error: null, pending: true };
    case SLACK_VALIDATION_SUCCESS:
      return {
        ...state,
        authenticated: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        error: null,
        pending: false,
      };
    case SLACK_VALIDATION_FAIL:
      return {
        ...state,
        authenticated: false,
        accessToken: null,
        user: null,
        error: action.payload,
        pending: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        accessToken: null,
        user: null,
        error: null,
        pending: false,
      };
    default:
      return state;
  }
};
