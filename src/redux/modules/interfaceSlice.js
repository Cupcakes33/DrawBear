import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModal: false
};

const interfaceSlice = createSlice({
  name: "INTERFACE",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isModal = action.payload
    },
  }
})

export const { showModal } = interfaceSlice.actions
export default interfaceSlice.reducer