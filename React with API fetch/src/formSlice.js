// src/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
// inside component
//const dispatch = useDispatch();
// after getting token:
//dispatch(setToken(token));

const initialState = {
  name: "",
  email: "",
  password: "",
  submitted: [],
  lastSubmitted: null,
  count: 0,
  registeredUser: null, // user data after registration
  token: null, // store login token here
  loginError: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setField(state, action) {
      const { field, value } = action.payload || {};
      if (field && Object.prototype.hasOwnProperty.call(state, field)) {
        state[field] = value;
      }
    },

    setRegisteredUser(state, action) {
      state.registeredUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuth(state) {
      state.registeredUser = null;
      state.token = null;
    },
    setLoginError(state, action) {
      state.loginError = action.payload;
    },

    // clear only the input fields
    clearForm(state) {
      state.name = "";
      state.email = "";
      state.password = "";
    },

    // on submit, store a snapshot into lastSubmitted (and optionally history)
    submitForm(state) {
      const entry = {
        id: Date.now(),
        name: state.name,
        email: state.email,
        passwordMask: state.password ? "*".repeat(Math.min(8, state.password.length)) : "",
        time: new Date().toLocaleString(),
      };

      state.lastSubmitted = entry;      // keep latest snapshot
      state.submitted.unshift(entry);   // push into history if you want to keep it
      // NOTE: we intentionally DO NOT clear state.name/email/password here so the live preview remains visible.
    },

    clearAllSubmitted(state) {
      state.submitted = [];
      state.lastSubmitted = null;
    },

    increment(state) { state.count += 1; },
    decrement(state) { state.count -= 1; },
  },
});

export const {
  setField,
  submitForm,
  clearForm,
  clearAllSubmitted,
  setRegisteredUser,
  setToken,
  clearAuth,
  setLoginError,
  increment,
  decrement,
} = formSlice.actions;

export default formSlice.reducer;
