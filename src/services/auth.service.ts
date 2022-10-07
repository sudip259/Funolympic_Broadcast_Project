import axios from "axios";
import api from "./api";
import TokenService from "./token.service";

const baseURL = "http://127.0.0.1:8000/api";

// function to request to register user api and return response
const register = (username: String, email: String, password: String) => {
  return api.post(`/sign_up/`, {
    username,
    email,
    password,
  });
};
// function to request to login user api and return response
const login = async (email: any, password: any) => {
  const response = await axios.post(`${baseURL}/log_in/`, {
    email,
    password,
  });
  if (response?.data) {
    TokenService.setUser(response?.data);
  }
  return response.data;
};

const AuthService = {
  register,
  login,
};
export default AuthService;
