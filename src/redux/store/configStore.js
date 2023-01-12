import { configureStore } from "@reduxjs/toolkit";
import diarySlice from '../modules/diarySlice'

const store = configureStore({
  reducer: { diarySlice },
});

export default store;
