import { LOGOUT_USER } from '../action-types/logout';
import axios from 'axios';
import history from '../../history';
import TicketsApi from '../../apis/tickets/TicketsApi';

export const logout = callback => async dispatch => {
  dispatch({ type: LOGOUT_USER });

  localStorage.removeItem('accessToken');
  axios.defaults.headers.common.Authorization = null;

  // 자동으로 피쳐로 넘어가게끔
  history.push('/auth/login');
  TicketsApi.expireAccessTokne();
  console.log(TicketsApi.axiosInstance.defaults.headers);

  callback();
};
