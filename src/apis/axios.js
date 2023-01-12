import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
});

export const loginApi = {
  login: async (payload) => await instance.post("/api/auth/login", { username: payload.email, password: payload.password }),
  signup: async (payload) => await instance.post("/api/auth/signup", { username: "", nickname: "", password: "", profileImg: "" }),
};