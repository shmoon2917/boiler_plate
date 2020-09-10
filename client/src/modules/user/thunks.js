import createAsyncThunk from '../../lib/createAsyncThunk';
import AuthService from '../../services/auth.service';
import { userConstants as type } from './constants';

export const loginUserThunk = createAsyncThunk(
  type.LOGIN_REQUEST,
  AuthService.login
);

export const registerUserThunk = createAsyncThunk(
  type.REGISTER_USER,
  AuthService.register
);

export const authUserThunk = createAsyncThunk(type.AUTH_USER, AuthService.auth);
