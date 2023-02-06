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
    ErrorModal: (state, action) => {
      state.errorModal = action.payload
    },
    LoginModal: (state, action) => {
      state.loginModal = action.payload
    },
    __TutorialModal: (state, action) => {
      state.tutorialModal = action.payload
    },
  }
})

export const { ErrorModal, LoginModal, __TutorialModal } = UISlice.actions
export default UISlice.reducer