import { configureStore } from "@reduxjs/toolkit";
import diarySlice from '../modules/diarySlice'
import interfaceSlice from '../modules/interfaceSlice'

const store = configureStore({
  reducer: { diarySlice, interfaceSlice },
});

export default store;
