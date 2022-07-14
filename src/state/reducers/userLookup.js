import {
  // GET_SGGSEARCH,
  GET_USER_LOOKUP,
  GET_USER_LOOKUP_SUCCESS,
  GET_USER_LOOKUP_ERROR,
  USER_STATE_TO_STOP_SUCCESS,
  USER_STATE_TO_NORMAL_SUCCESS,
} from "../action-types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = {
    data: {
      userCount: 0,
      totalPage: 0,
      currentPage: 0,
      userList: [],
    },
    error: null,
  },
  action
) {
  switch (action.type) {
    case USER_STATE_TO_STOP_SUCCESS:
      // 해당 변경된 아이디를 찾아서 정보를 변경합니다.
      console.log("asdfasdfadsfas", action.payload);
      const newUserList = state.data.userList.map((element) => {
        if (element._id === action.payload._id) {
          console.log("find", element._id);
          return action.payload;
        }
        return element;
      });
      return {
        ...state,
        data: {
          userCount: state.data.userCount,
          totalPage: state.data.totalPage,
          currentPage: state.data.currentPage,
          userList: newUserList,
        },
        error: null,
      };
    case USER_STATE_TO_NORMAL_SUCCESS:
      const newNORMALUserList = state.data.userList.map((element) => {
        if (element._id === action.payload._id) {
          console.log("find", element._id);
          return action.payload;
        }
        return element;
      });
      return {
        ...state,
        data: {
          userCount: state.data.userCount,
          totalPage: state.data.totalPage,
          currentPage: state.data.currentPage,
          userList: newNORMALUserList,
        },
        error: null,
      };
    case GET_USER_LOOKUP:
      return { ...state, data: action.payload, error: null };
    case GET_USER_LOOKUP_SUCCESS:
      return { ...state, data: action.payload, error: null };
    case GET_USER_LOOKUP_ERROR:
      return { ...state, data: [], error: action.payload };
    default:
      return state;
  }
}
