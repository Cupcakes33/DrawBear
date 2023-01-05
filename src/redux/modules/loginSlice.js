import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginApi } from "../../apis/axios";

const initialState = {
  holiday: [
    {
      dateKind: "",
      dateName: "",
      isHoliday: "",
      locdate: "",
      seq: ""
    }
  ]
};

export const __login = createAsyncThunk(
  "LOGIN_FINALE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await loginApi.login(payload)
      localStorage.setItem("token", data.token);

      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const __holiday = createAsyncThunk(
  "HOLIDAY_FINALE",
  async (selectedYear, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${selectedYear}&ServiceKey=${process.env.REACT_APP_HOLIDAY_AUTH_KEY}`)
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
      .addCase(__login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__login.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(__login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(__holiday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__holiday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.holiday = action.payload
      })
      .addCase(__holiday.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export default loginSlice.reducer;