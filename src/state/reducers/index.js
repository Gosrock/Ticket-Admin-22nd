import { combineReducers } from 'redux';
import { auth } from './auth';
import examplePagination from './examplePagination';
import ticketPagination from './ticketPagination';
import LandingPage from './LandingPage';
import slackMessage from './slackMessage';
import usersPage from './usersPage';
import enterPage from './enterPage';
import orderListPagination from './orderListPagination';
import CheckPage from './CheckPage';
import randomCom from './randomCom';

export default combineReducers({
  slackMessage: slackMessage,
  auth: auth,
  examplePagination: examplePagination,
  usersPage: usersPage,
  ticketPagination: ticketPagination,
  enterPage: enterPage,
  LandingPage: LandingPage,
  orderListPagination: orderListPagination,
  checkPage: CheckPage,
  randomCom: randomCom
});
