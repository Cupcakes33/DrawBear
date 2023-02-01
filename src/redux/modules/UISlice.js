import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorModal: {
    isModal: false,
    bigTxt: "",
    smallTxt: "",
    move: "",
    diaryId: ""
  },
};

const UISlice = createSlice({
  name: "INTERFACE",
  initialState,
  reducers: {
    ErrorModal: (state, action) => {
      state.errorModal = action.payload
    },
  }
})

export const { ErrorModal } = UISlice.actions
export default UISlice.reducer