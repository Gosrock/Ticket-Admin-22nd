import axios from 'axios';
import {
  EXAMPLE_PAGINATION_PENDING,
  EXAMPLE_PAGINATION_SUCCESS,
  EXAMPLE_PAGINATION_ERROR
} from '../action-types';

export const examplePagination =
  ({ requestPage }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: EXAMPLE_PAGINATION_PENDING });

      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
        {
          params: {
            _page: requestPage,
            _limit: 10
          }
        }
      );
      console.log('포토 조회액션', response);

      const data = {
        total: 5000,
        currentPage: requestPage,
        photoList: response.data
      };

      dispatch({ type: EXAMPLE_PAGINATION_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      dispatch({ type: EXAMPLE_PAGINATION_ERROR, payload: '조회 실패' });
    }
  };
