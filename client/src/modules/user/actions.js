import axios from "axios";

export const KEEP_USER_LOGGED_IN = "user/KEEP_USER_LOGGED_IN";
export const LOGIN_USER = "user/LOGIN_USER";
export const LOGIN_USER_SUCCESS = "user/LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "user/LOGIN_USER_ERROR";
export const REGISTER_USER = "user/REGISTER_USER";
export const REGISTER_USER_SUCCESS = "user/REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "user/REGISTER_USER_ERROR";
export const AUTH_USER = "user/AUTH_USER";
export const AUTH_USER_SUCCESS = "user/AUTH_USER_SUCCESS";
export const AUTH_USER_ERROR = "user/AUTH_USER_ERROR";
export const CLEAR_USER = "user/CLEAR_USER";

export const loginUser = (body) => ({
  type: LOGIN_USER,
  payload: body,
});

export const registerUser = (body) => ({
  type: REGISTER_USER,
  payload: body,
});

export const authUser = () => ({
  type: AUTH_USER,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const keepUserLoggedIn = (user) => ({
  type: KEEP_USER_LOGGED_IN,
  payload: user,
});

// export const registerUser = (dataToSubmit) => {
//   const request = axios
//     .post("/api/users/register", dataToSubmit)
//     .then((res) => res.data);

//   return {
//     type: REGISTER_USER,
//     payload: request,
//   };
// };
