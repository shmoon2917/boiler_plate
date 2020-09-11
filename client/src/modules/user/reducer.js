import { userConstants } from "./constants";
import { asyncState, createAsyncReducer } from "../../lib/reducerUtils";

const initialState = {
  login: asyncState.initial(),
  register: asyncState.initial(),
  auth: asyncState.initial(),
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    case userConstants.LOGIN_REQUEST_SUCCESS:
    case userConstants.LOGIN_REQUEST_ERROR:
      return createAsyncReducer(userConstants.LOGIN_REQUEST, "login")(
        state,
        action
      );
    case userConstants.REGISTER_REQUEST:
    case userConstants.REGISTER_REQUEST_SUCCESS:
    case userConstants.REGISTER_REQUEST_ERROR:
      return createAsyncReducer(userConstants.REGISTER_REQUEST, "register")(
        state,
        action
      );

    case userConstants.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        login: asyncState.initial(),
      };
    default:
      return state;
  }
};

export default user;
