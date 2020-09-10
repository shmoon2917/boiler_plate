import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  KEEP_USER_LOGGED_IN,
  CLEAR_USER,
} from "./actions";
import { asyncState, createAsyncReducer } from "../../lib/reducerUtils";

const initialState = {
  userInfo: asyncState.initial(),
  register: {},
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGIN_USER_SUCCESS:
    case LOGIN_USER_ERROR:
      return createAsyncReducer(LOGIN_USER, "userInfo")(state, action);
    case KEEP_USER_LOGGED_IN:
      return {
        ...state,
        userInfo: asyncState.success(action.payload),
      };
    case CLEAR_USER:
      return {
        ...state,
        userInfo: asyncState.initial(),
      };
    default:
      return state;
  }
};

export default user;
