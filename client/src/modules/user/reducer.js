import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./actions";
import { asyncState, createAsyncReducer } from "../../lib/reducerUtils";

const initialState = {
  user: asyncState.initial(),
  register: {},
};

console.log(initialState);

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGIN_USER_SUCCESS:
    case LOGIN_USER_ERROR:
      return createAsyncReducer(LOGIN_USER, "user")(state, action);
    default:
      return state;
  }
};

export default user;
