import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModal: false,
  content: ""
};

const interfaceSlice = createSlice({
  name: "INTERFACE",
  initialState,
  reducers: {
    showModal: (state, action) => {
      console.log(action.payload)
      state.isModal = action.payload.isModal
      state.content = action.payload.content
    },
  }
})

export const { showModal } = interfaceSlice.actions
export default interfaceSlice.reducer