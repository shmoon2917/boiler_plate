import axios from "axios";
import { authHeader } from "../_helpers/auth-header";

const API_URL = "/api/auth";

const register = async (body) => {
  try {
    const response = await axios.post(API_URL + "/signup", body);
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    throw error;
  }
};

const login = async (body) => {
  try {
    const response = await axios.post(API_URL + "/signin", body);
    const user = await handleResponse(response);

    if (user.accessToken) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axios.get(API_URL + "/signout", {
      headers: authHeader(),
    });
    const data = await handleResponse(response);
    localStorage.removeItem("user");
    return data;
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
  console.log("getCurrentUser from ls");
  return JSON.parse(localStorage.getItem("user"));
};

const handleResponse = (response) => {
  const { status, message, data } = response.data;

  if (status !== "ok") {
    const error = message;
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
