import axios from 'axios';
import { RANDOM_SUCCESS, RANDOM_ERROR } from '../action-types';

export const randomCom = callback => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.gosrock.band/v1/users/random/comment/userInfo?take=5`
    );

    console.log(response.data);

    const randm = {
      _list: response.data.data
    };
    dispatch({ type: RANDOM_SUCCESS, payload: randm });
  } catch (e) {
    dispatch({ type: RANDOM_ERROR, payload: '조회실패' });
    console.log(e);
  }
};
