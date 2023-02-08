import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorModal: {
    isModal: false,
    bigTxt: "",
    smallTxt: "",
    move: "",
    diaryId: "",
  },
  loginModal: false,
  tutorialModal: false,
};

const UISlice = createSlice({
  name: "INTERFACE",
  initialState,
  reducers: {
    __ErrorModal: (state, action) => {
      state.errorModal = action.payload
    },
    __LoginModal: (state, action) => {
      state.loginModal = action.payload
    },
    __TutorialModal: (state, action) => {
      state.tutorialModal = action.payload
    },
  }
})

export const { __ErrorModal, __LoginModal, __TutorialModal } = UISlice.actions
export default UISlice.reducer