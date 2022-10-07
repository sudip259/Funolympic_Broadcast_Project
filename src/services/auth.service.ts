import api from "./api";
import TokenService from "./token.service";

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
  const response = await api.post(`/log_in/`, {
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
