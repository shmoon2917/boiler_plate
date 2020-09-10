import { userConstants as type } from '.';
import { asyncState, createAsyncReducer } from '../../lib/reducerUtils';

const initialState = {
  // userInfo: asyncState.initial(),
  // register: {},
};
export const user = (state = initialState, action) => {
  switch (action.type) {
    // case type.LOGIN_REQUEST:
    // case type.LOGIN_REQUEST_SUCCESS:
    // case type.LOGIN_REQUEST_ERROR:
    //   return createAsyncReducer(type.LOGIN_REQUEST, 'userInfo')(state, action);
    // case type.REGISTER_USER:
    // case type.REGISTER_USER_SUCCESS:
    // case type.REGISTER_USER_ERROR:
    //   return createAsyncReducer(type.REGISTER_USER, 'register')(state, action);
    // case type.KEEP_USER_LOGGED_IN:
    //   return {
    //     ...state,
    //     userInfo: asyncState.success(action.payload),
    //   };
    // case type.CLEAR_USER:
    //   return {
    //     ...state,
    //     userInfo: asyncState.initial(),
    //   };
    default:
      return state;
  }
};
