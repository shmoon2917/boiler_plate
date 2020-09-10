import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "/api/auth/";

const register = async (body) => {
  const { email, name, password } = body;
  try {
    const response = (
      await axios.post(API_URL + "signup", {
        name,
        email,
        password,
      })
    ).data;

    if (response.status === "ok") {
      return response.data;
    } else {
      throw response.error;
    }
  } catch (error) {
    throw error;
  }
};

const login = async (body) => {
  /*
   id / username / email / roles / accessToken
  */
  const { email, password } = body;
  try {
    const response = (await axios.post(API_URL + "signin", { email, password }))
      .data;

    if (response.status === "ok") {
      // check if the internal status is ok
      // then pass on the data
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } else {
      // if internally there are errors
      // pass on the error, in a correct implementation
      // such errors should throw an HTTP 4xx or 5xx error
      // so that it directs straight to the catch block
      throw response.error;
    }
  } catch (error) {
    // any HTTP error is caught here
    // can extend this implementation to customize the error messages
    // ex: dispatch(loadTodoError("Sorry can't tlak to our servers right now"));
    throw error;
  }
};

const logout = async () => {
  try {
    const response = (
      await axios.get(API_URL + "signout", { headers: authHeader() })
    ).data;
    if (response.status === "ok") {
      localStorage.removeItem("user");
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
    const response = (await axios.get(API_URL, { headers: authHeader() })).data;
    if (response.status === "ok") {
      return response.data;
    } else {
      throw response.error;
    }
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
