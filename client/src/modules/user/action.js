import axios from 'axios';

export const LOGIN_USER = 'user/LOGIN_USER';
export const REGISTER_USER = 'user/REGISTER_USER';
export const AUTH_USER = 'user/AUTH_USER';

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = (dataToSubmit) => {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((res) => res.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const authUser = () => {
  const request = axios.get('/api/users/auth').then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};
