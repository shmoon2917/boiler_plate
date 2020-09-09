import axios from "axios";

export const LOGIN_USER = "user/LOGIN_USER";
export const LOGIN_USER_SUCCESS = "user/LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "user/LOGIN_USER_ERROR";
export const REGISTER_USER = "user/REGISTER_USER";
export const REGISTER_USER_SUCCESS = "user/REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "user/REGISTER_USER_ERROR";
export const AUTH_USER = "user/AUTH_USER";
export const AUTH_USER_SUCCESS = "user/AUTH_USER_SUCCESS";
export const AUTH_USER_ERROR = "user/AUTH_USER_ERROR";

export const loginUser = (body) => ({
  type: LOGIN_USER,
  payload: body,
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

// export const authUser = () => {
//   const request = axios.get("/api/users/auth").then((res) => res.data);

//   return {
//     type: AUTH_USER,
//     payload: request,
//   };
// };
