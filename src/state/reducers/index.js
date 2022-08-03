import { combineReducers } from 'redux';
import { auth } from './auth';
import examplePagination from './examplePagination';
import ticketPagination from './ticketPagination';
import slackMessage from './slackMessage';

export default combineReducers({
  slackMessage: slackMessage,
  auth: auth,
  examplePagination: examplePagination,
  ticketPagination: ticketPagination
});
