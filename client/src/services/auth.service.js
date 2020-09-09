import axios from "axios";

const API_URL = "/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (body) => {
  /*
   id / username / email / roles / accessToken
  */
  const { email, password } = body;
  try {
    const response = await axios.post(API_URL + "signin", { email, password });

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } else if (!response.data.loginSuccess) {
      throw response.data;
    }
  } catch (e) {
    throw e;
  }
};

const logout = () => {
  localStorage.removeItem("user");
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
