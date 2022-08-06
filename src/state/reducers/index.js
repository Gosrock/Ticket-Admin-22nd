import { combineReducers } from 'redux';
import { auth } from './auth';
import examplePagination from './examplePagination';
import ticketPagination from './ticketPagination';
import LandingPage from './LandingPage';
import slackMessage from './slackMessage';
import usersPage from './usersPage';

export default combineReducers({
  slackMessage: slackMessage,
  auth: auth,
  examplePagination: examplePagination,
  usersPage: usersPage,
  ticketPagination: ticketPagination,
  LandingPage: LandingPage
});
