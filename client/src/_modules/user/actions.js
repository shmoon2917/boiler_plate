import { userConstants as type } from "./constants";

export const userActions = {
  login,
  register,
  checkUserIsLoggedIn,
};

function login(body) {
  return { type: type.LOGIN_REQUEST, payload: body };
}

function register(body) {
  return { type: type.REGISTER_REQUEST, payload: body };
}

function checkUserIsLoggedIn(user) {
  return { type: type.CHECK_USER_IS_LOGGED_IN, payload: user };
}

export const authUser = () => ({
  type: type.AUTH_USER,
});

export const clearUser = () => ({
  type: type.CLEAR_USER,
});
