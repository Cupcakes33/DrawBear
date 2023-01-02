import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../apis/axios";

const initialState = {

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
  }
})

export default loginSlice.reducer;