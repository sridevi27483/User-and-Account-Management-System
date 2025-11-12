// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload); // optional save
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    loadTokenFromStorage: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { setToken, logout, loadTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
