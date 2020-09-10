import createAsyncThunk from "../../lib/createAsyncThunk";
import AuthService from "../../services/auth.service";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./actions";

export const loginUserThunk = createAsyncThunk(
  LOGIN_USER,
  AuthService.login,
  "/"
);

export const registerUserThunk = createAsyncThunk(
  REGISTER_USER,
  AuthService.register,
  "/"
);

export const authUserThunk = createAsyncThunk(AUTH_USER, AuthService.auth);
