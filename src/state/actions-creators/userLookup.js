import axios from 'axios';
import {
  GET_USER_LOOKUP,
  GET_USER_LOOKUP_SUCCESS,
  GET_USER_LOOKUP_ERROR
} from '../action-types';

export const userLookup =
  ({ searchOption, page, searchString }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: GET_USER_LOOKUP });

      const response = await axios.get('/api/admin/user/lookup', {
        params: {
          searchOption,
          page,
          searchString
        }
      });

      const data = {
        userCount: response.data.data.userCount,
        totalPage: response.data.data.totalPage,
        currentPage: page,
        userList: response.data.data.userList
      };

      dispatch({ type: GET_USER_LOOKUP_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: GET_USER_LOOKUP_ERROR, payload: '조회 실패' });
    }
  };
