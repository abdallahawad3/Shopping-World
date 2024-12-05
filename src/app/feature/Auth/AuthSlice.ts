import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isLogin: boolean;
}

const initialState: IAuthState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login Action
    loginAction: (state) => {
      state.isLogin = true;
    },
    // Logout Action
    logOutAction: (state) => {
      state.isLogin = false;
    },
  },
});

export const { logOutAction, loginAction } = authSlice.actions;

export default authSlice.reducer;
