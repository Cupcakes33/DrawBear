import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diaryTypes: {
    icon: "solo",
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
    __diaryType: (state, action) => {
      state.diaryTypes.icon = action.payload.icon
      state.diaryTypes.couple = action.payload.couple
      state.diaryTypes.bookmark = action.payload.bookmark
    },
    __addDiary: (state, action) => {
      state.couple = action.payload
    },
    __diaryData: (state, action) => {
      state.diaryData = action.payload
    },
  },
})

export const { __diaryType, __addDiary, __diaryData } = diarySlice.actions
export default diarySlice.reducer;