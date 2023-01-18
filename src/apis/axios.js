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
  login: async (inputData) => {
    const { data } = await instance.post("/api/auth/login", {
      email: inputData.email,
      password: inputData.password,
    });
    localStorage.setItem("token", data.token);
    setTimeout(() => {
      localStorage.clear();
    }, 3600000);
    return data;
  },

  signup: async (formData) => {
    console.log(formData);
    await instance.post("/api/auth/signup", formData);
  },
};

export const mypageApi = {
  read: async () => {
    const { data } = await instance.get("/api/userInfo");
    console.log(data);
    return data;
  },
};

export const mainApi = {
  read: async () => {
    const { data } = await instance.get("/api/diary");
    return data;
  },
  create: async (addData) => {
    const { data } = await instance.post("/api/diary", {
      couple: addData.couple,
      diaryName: addData.diaryName,
      outsideColor: addData.selectedColor,
    });
    return data;
  },
  update: async (updateData) => {
    const { data } = await instance.patch(`/api/diary/${updateData.id}`, {
      couple: updateData.couple,
      diaryName: updateData.diaryName,
      outsideColor: updateData.selectedColor,
    });
    return data;
  },
  delete: async (diaryId) => {
    const { data } = await instance.delete(`/api/diary/${diaryId}`);
    return data;
  },
  bookmark: async (diaryId) => {
    console.log(diaryId);
    const { data } = await instance.post(`/api/bookmark/diary/${diaryId}`);
    return data;
  },
};

export const diaryApi = {
  post: async ({ formData, diaryId }) => {
    await instance.post(`api/post/${diaryId}`, formData);
  },
  holiday: async (selectedYear) => {
    const { data } = await axios.get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${selectedYear}&ServiceKey=${process.env.REACT_APP_HOLIDAY_AUTH_KEY}&numOfRows=20`
    );
    return data.response.body.items.item;
  },
};
