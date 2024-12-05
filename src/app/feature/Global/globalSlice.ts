import { createSlice } from "@reduxjs/toolkit";

interface globalState {
  isOpenCartDrawer: boolean;
}

const initialState: globalState = {
  isOpenCartDrawer: false,
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    // Open drawer
    openDrawerAction: (state) => {
      state.isOpenCartDrawer = true;
    },
    closeDrawerAction: (state) => {
      state.isOpenCartDrawer = false;
    },
  },
});

export const { closeDrawerAction, openDrawerAction } = globalSlice.actions;
export default globalSlice.reducer;
