import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
});

export const loginApi = {
  login: async (payload) => { const { data } = await instance.post("/api/auth/login", { email: payload.email, password: payload.password }); return data },
  signup: async (payload) => await instance.post("/api/auth/signup", { username: "", nickname: "", password: "", profileImg: "" }),
};