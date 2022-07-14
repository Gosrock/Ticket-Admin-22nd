import axios from "axios";
import {
  KEYWORD_LIST_PENDING,
  KEYWORD_LIST_SUCCESS,
  KEYWORD_LIST_ERROR,
} from "../action-types";

export const keywordList =
  ({ page, searchString }, callback) =>
  async (dispatch) => {
    try {
      dispatch({ type: KEYWORD_LIST_PENDING });

      const response = await axios.get("/api/admin/keyword", {
        params: {
          page,
          searchString,
        },
      });

      const data = {
        searchString: searchString,
        keywordCount: response.data.data.keywordCount,
        totalPage: response.data.data.totalPage,
        currentPage: page,
        keywordList: response.data.data.keywordList,
      };

      dispatch({ type: KEYWORD_LIST_SUCCESS, payload: data });

      // 자동으로 피쳐로 넘어가게끔
      // callback();
    } catch (e) {
      //400 ~
      console.log(e.response.data);

      dispatch({ type: KEYWORD_LIST_ERROR, payload: "조회 실패" });
    }
  };
