import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
});

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const loginApi = {
  login: async (payload) => {
    const { data } = await instance.post("/api/auth/login", { email: payload.email, password: payload.password });
    localStorage.setItem("token", data.token);
    return data
  },
  signup: async (payload) => await instance.post("/api/auth/signup", { username: "", nickname: "", password: "", profileImg: "" }),
};

export const mainApi = {
  read: async (payload) => { const { data } = await instance.get("/api/diary"); return data },
}