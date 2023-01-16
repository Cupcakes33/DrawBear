import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const __holiday = createAsyncThunk(
  "HOLIDAY_FINALE",
  async (selectedYear, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${selectedYear}&ServiceKey=${process.env.REACT_APP_HOLIDAY_AUTH_KEY}&numOfRows=20`)
      return thunkAPI.fulfillWithValue(data.response.body.items.item)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const diarySlice = createSlice({
  name: "DIARY",
  initialState,
  reducers: {
    diaryType: (state, action) => {
      state.diaryTypes.solo = action.payload.solo
      state.diaryTypes.couple = action.payload.couple
      state.diaryTypes.bookmark = action.payload.bookmark
    },
    addDiary: (state, action) => {
      state.couple = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__holiday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__holiday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.holiday = action.payload.map(v => v.locdate)
      })
      .addCase(__holiday.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export const { diaryType, addDiary } = diarySlice.actions
export default diarySlice.reducer;