import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  diaryId: "",
};
const chatSlice = createSlice({
  name: "CHATTING",
  initialState,
  reducers: {
    viewChatList: (state, action) => {
      state.userId = action.payload.userId;
      state.diaryId = action.payload.diaryId;
    },
  },
});

export const { viewChatList } = chatSlice.actions;
export default chatSlice.reducer;
