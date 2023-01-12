import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../apis/axios";

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

export const __login = createAsyncThunk(
  "LOGIN_FINALE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.post("api/auth/login", { email: payload.email, password: payload.password })
      localStorage.setItem("token", data.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      return thunkAPI.fulfillWithValue(data.result)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result)
    }
  }
)

export const __main = createAsyncThunk(
  "MAIN_FINALE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get("/api/diary"
      // , {
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("token")}`,
      //   }
      // }
      )

      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.result)
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

      .addCase(__login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.result = action.payload
      })
      .addCase(__login.rejected, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
      })

      .addCase(__main.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__main.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaires = action.payload;
      })
      .addCase(__main.rejected, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
      })
  }
})

export default loginSlice.reducer;