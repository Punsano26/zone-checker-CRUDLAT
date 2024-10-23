import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

const register = async ( username, email, password, address, lat, lng) => {
  return await api.post(API_URL + "/register", { username, email, password, address, lat, lng });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });
  if (response.data.accessToken) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.accessToken)
    );
    localStorage.setItem("user", JSON.stringify(response));
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;