import { configureStore } from "@reduxjs/toolkit";
import loginSlice from '../modules/loginSlice'

const store = configureStore({
  reducer: { loginSlice },
  // devTools: false
});

export default store;
