import createAsyncThunk from '../../_lib/createAsyncThunk';
import AuthService from '../../_services/auth.service';
import { userConstants } from './constants';

export const loginUserThunk = createAsyncThunk(
  userConstants.LOGIN_REQUEST,
  AuthService.login
);

export const registerUserThunk = createAsyncThunk(
  userConstants.REGISTER_REQUEST,
  AuthService.register
);

export const logoutUserThunk = createAsyncThunk(
  userConstants.LOGOUT_REQUEST,
  AuthService.logout
);

export const authUserThunk = createAsyncThunk(
  userConstants.AUTH_USER,
  AuthService.auth
);
