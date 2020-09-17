import { userConstants } from "./constants";
import { asyncState, createAsyncReducer } from "../../_lib/reducerUtils";

const initialState = {
  login: asyncState.initial(),
  register: asyncState.initial(),
  auth: asyncState.initial(),
  cart: asyncState.initial(),
  cartDetail: asyncState.initial(),
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

    case userConstants.ADD_TO_CART:
    case userConstants.ADD_TO_CART_SUCCESS:
    case userConstants.ADD_TO_CART_ERROR:
      return createAsyncReducer(userConstants.ADD_TO_CART, "cart")(
        state,
        action
      );

    case userConstants.GET_CART_ITEMS:
    case userConstants.GET_CART_ITEMS_SUCCESS:
    case userConstants.GET_CART_ITEMS_ERROR:
      return createAsyncReducer(userConstants.GET_CART_ITEMS, "cartDetail")(
        state,
        action
      );

    case userConstants.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        login: asyncState.initial(),
      };
    case userConstants.CHECK_USER_IS_LOGGED_IN:
      return {
        ...state,
        login: asyncState.success(action.payload),
      };
    default:
      return state;
  }
};

export default user;
