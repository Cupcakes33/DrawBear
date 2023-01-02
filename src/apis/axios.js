import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
});

export const loginApi = {
  login: (payload) => instance.post("/api/login", { username: payload.email, password: payload.password }),
  signup: (payload) => instance.post("/api/signup", { username: "", nickname: "", password: "", profileImg: "" }),
};