import axios from 'axios';
import { authHeader } from '../_helpers/auth-header';

const API_URL = '/api/auth';

const register = async (body) => {
  const { email, name, password } = body;
  try {
    const response = (
      await axios.post(API_URL + '/signup', {
        name,
        email,
        password,
      })
    ).data;

    if (response.status === 'ok') {
      return response.data;
    } else {
      throw response.error;
    }
  } catch (error) {
    throw error;
  }
};

const login = async (body) => {
  try {
    const response = await axios.post(API_URL + '/signin', body);
    const user = await handleResponse(response);

    // store user details and jwt token in local storage to keep user logged in between page refreshes
    if (user.accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  } catch (error) {
    console.log(error);
    // any HTTP error is caught here
    // can extend this implementation to customize the error messages
    // ex: dispatch(loadTodoError("Sorry can't talk to our servers right now"));
    throw error;
  }
};

const logout = async () => {
  try {
    const response = (
      await axios.get(API_URL + '/signout', { headers: authHeader() })
    ).data;
    if (response.status === 'ok') {
      localStorage.removeItem('user');
      return response.data;
    } else {
      throw response.error;
    }
  } catch (error) {
    throw error;
  }
};

const auth = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const handleResponse = (response) => {
  console.log(response);
  const { status, error: errorMessage, data } = response.data;

  if (status !== 'ok') {
    const error = errorMessage;
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  auth,
};
