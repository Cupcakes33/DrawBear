import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
  // withCredentials: true, // 로그인 후 로그인이 풀리는 문제를 해결하기 위함
});

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = getToken();
  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const unauthorization = error.response.data.error;
    if (unauthorization?.indexOf("로그인") >= 0) {
      localStorage.removeItem("token");
      alert("로그인 후 이용가능합니다.");
      return window.location.replace("http://localhost:3000/login");
      // return window.location.replace("https://finale-omega.vercel.app/login");
    } else return Promise.reject(error);
  }
);

// 로그인 API

export const loginApi = {
  login: (inputData) =>
    instance.post("/api/auth/login", {
      email: inputData.email,
      password: inputData.password,
    }),

  create: async (formData) => {
    await instance.post("/api/auth/signup", formData);
  },
};

// 메인 페이지 다이어리 API

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
    const { data } = await instance.post(`/api/bookmark/diary/${diaryId}`);
    return data;
  },
};

// 일기 조회 API

export const diaryApi = {
  get: async (diaryId) => {
    const { data } = await instance.get(`/api/post/${diaryId}`);
    return data.posts;
  },

  holiday: async (selectedYear) => {
    const { data } = await axios.get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${selectedYear}&ServiceKey=${process.env.REACT_APP_HOLIDAY_AUTH_KEY}&numOfRows=25`
    );
    return data.response.body.items.item;
  },

  search: async (payload) => {
    const { diaryId, title } = payload;
    const { data } = await instance.get(
      `/api/post/${diaryId}/search?title=${title}`
    );
    return data;
  },
};

// 일기 상세 조회 API

export const postsApi = {
  post: async ({ formData, diaryId }) => {
    await instance.post(`api/post/${diaryId}`, formData);
  },

  get: async (diaryId) => {
    const { data } = await instance.get(`/api/post/detail/${diaryId}`);
    return data.posts;
  },
  delete: async (postId) => {
    await instance.delete(`/api/post/${postId}`);
  },
  patch: async ({ formData, postId }) => {
    await instance.patch(`/api/post/${postId}`, formData);
  },

  bookmark: async (postId) => {
    const { data } = await instance.post(`/api/bookmark/post/${postId}`);
    return data;
  },
};

// 댓글 API

export const commentsApi = {
  post: async ({ comment, postId }) => {
    await instance.post(`/api/comment/${postId}`, { comment: comment });
  },

  patch: async ({ comment, commentId }) => {
    await instance.patch(`/api/comment/${commentId}`, { comment: comment });
  },

  delete: async (commentId) => {
    await instance.delete(`/api/comment/${commentId}`);
  },
};

// 더보기 페이지 API

export const mypageApi = {
  read: async () => {
    const { data } = await instance.get("/api/userInfo");
    return data;
  },
  update: async (formData) => {
    const { data } = await instance.patch("/api/userInfo/profile", formData);
    return data;
  },
  patch: async (inputData) => {
    const { data } = await instance.patch("/api/userInfo/unregister", {
      currentPassword: inputData.password,
    });
    return data;
  },
  PWupdate: async (inputData) => {
    const { data } = await instance.patch("/api/userInfo/password", {
      currentPassword: inputData.currentPW,
      changePassword: inputData.password,
      confirmPassword: inputData.passwordCheck,
    });
    return data;
  },
};

// 알람 API

export const alarmApi = {
  read: async () => {
    const { data } = await instance.get("/api/notification/");
    return data;
  },
  chatlist: async () => {
    const { data } = await instance.get("/api/diary/share");
    return data;
  },
  patch: async ({ diaryId, notificationId }) => {
    const { data } = await instance.patch(
      `/api/diary/inviteAccept/${diaryId}/${notificationId}`
    );
    return data;
  },
  delete: async (notificationId) => {
    const { data } = await instance.delete(
      `/api/notification/${notificationId}`
    );
    return data;
  },
};

// 초대 API

export const inviteApi = {
  search: async (nickName) => {
    const { data } = await instance.get(`/api/userInfo/nickname/${nickName}`);
    return data;
  },
  invite: async ({ diaryId, invitedId }) => {
    const { data } = await instance.patch(
      `/api/diary/invite/${diaryId}/${invitedId}`
    );
    return data;
  },
};

// 채팅 API

export const chattingApi = {
  search: async (diaryId) => {
    const { data } = await instance.get(`/api/chat/${diaryId}`);
    return data.Chats;
  },
};