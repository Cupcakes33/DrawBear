import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorModal: {
    isModal: false,
    bigTxt: "",
    smallTxt: "",
    move: "",
    diaryId: ""
  },
  isSuccess: false
};

const UISlice = createSlice({
  name: "INTERFACE",
  initialState,
  reducers: {
    ErrorModal: (state, action) => {
      state.errorModal = action.payload
    },
    Rerendering: (state, action) => {
      state.isSuccess = action.payload
    },
  }
})

export const { ErrorModal, Rerendering } = UISlice.actions
export default UISlice.reducer