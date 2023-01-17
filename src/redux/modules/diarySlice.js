import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holiday: [],
  diaryTypes: {
    couple: 0,
    bookmark: 0
  },
  couple: 0,
  result: "",
  isLoading: ""
};

const diarySlice = createSlice({
  name: "DIARY",
  initialState,
  reducers: {
    diaryType: (state, action) => {
      state.diaryTypes.couple = action.payload.couple
      state.diaryTypes.bookmark = action.payload.bookmark
    },
    addDiary: (state, action) => {
      state.couple = action.payload
    },
  },
})

export const { diaryType, addDiary } = diarySlice.actions
export default diarySlice.reducer;