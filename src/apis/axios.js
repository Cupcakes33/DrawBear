import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_MY_API,
  baseURL: "https://mylee.site",
});

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const loginApi = {
  login: async (payload) => {
    const { data } = await instance.post("/api/auth/login", {
      email: payload.email,
      password: payload.password,
    });
    localStorage.setItem("token", data.token);
    return data;
  },
  signup: async (payload) =>
    await instance.post("/api/auth/signup", {
      username: "",
      nickname: "",
      password: "",
      profileImg: "",
    }),
};

export const mainApi = {
  read: async (payload) => {
    const { data } = await instance.get("/api/diary");
    return data;
  },
};

export const postDiaryApi = {
  post: async (formData) => {
    const data = await instance.post("api/post/10", formData);
    return data;
  },
};
