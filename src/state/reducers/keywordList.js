import {
  // GET_SGGSEARCH,
  KEYWORD_LIST_PENDING,
  KEYWORD_LIST_SUCCESS,
  KEYWORD_LIST_ERROR,
} from "../action-types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = {
    data: {
      keywordCount: 0,
      totalPage: 0,
      currentPage: 0,
      keywordList: [],
      searchString: "",
    },
    error: null,
  },
  action
) {
  switch (action.type) {
    case KEYWORD_LIST_PENDING:
      return { ...state, data: [], error: null };
    case KEYWORD_LIST_SUCCESS:
      return { ...state, data: action.payload, error: null };
    case KEYWORD_LIST_ERROR:
      return { ...state, data: [], error: action.payload };
    default:
      return state;
  }
}
