import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "../modules/diarySlice";
import UISlice from "../modules/UISlice";
import chatSlice from "../modules/chatSlice";

const store = configureStore({
  reducer: { diarySlice, UISlice, chatSlice },
});

export default store;
