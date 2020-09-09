import createAsyncThunk from "../../lib/createAsyncThunk";
import AuthService from "../../services/auth.service";
import { LOGIN_USER } from "./actions";

export const loginUserThunk = createAsyncThunk(
  LOGIN_USER,
  AuthService.login,
  "/"
);

export const goToHome = () => (dispatch, { history }) => {
  history.push("/");
};
