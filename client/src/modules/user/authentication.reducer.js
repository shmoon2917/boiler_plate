import { userConstants } from './constants';
import { asyncState, createAsyncReducer } from '../../lib/reducerUtils';

const initialState = {
  login: asyncState.initial(),
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    case userConstants.LOGIN_REQUEST_SUCCESS:
    case userConstants.LOGIN_REQUEST_ERROR:
      return createAsyncReducer(userConstants.LOGIN_REQUEST, 'login')(
        state,
        action
      );
    default:
      return state;
  }
};
