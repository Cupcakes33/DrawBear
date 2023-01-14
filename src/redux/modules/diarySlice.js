import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  holiday: [],
  diaires: [],
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

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
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

export default loginSlice.reducer;