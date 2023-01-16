import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModal: false,
  content: "",
  move: ""
};

const UISlice = createSlice({
  name: "INTERFACE",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isModal = action.payload.isModal
      state.content = action.payload.content
      state.move = action.payload.move
    },
  }
})

export const { showModal } = UISlice.actions
export default UISlice.reducer