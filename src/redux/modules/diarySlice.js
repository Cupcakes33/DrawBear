import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diaryTypes: {
    couple: 0,
    bookmark: 0
  },
  diaryData: {
    diaryName: "",
    diaryId: 0
  },
  couple: 0,
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
    diaryData: (state, action) => {
      state.diaryData = action.payload
    },
  },
})

export const { diaryType, addDiary, diaryData } = diarySlice.actions
export default diarySlice.reducer;