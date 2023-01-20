import { configureStore } from "@reduxjs/toolkit";
import diarySlice from '../modules/diarySlice'
import UISlice from '../modules/UISlice'

const store = configureStore({
  reducer: { diarySlice, UISlice },
});

export default store;
