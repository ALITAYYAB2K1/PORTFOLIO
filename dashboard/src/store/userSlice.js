import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthinticated: false,
    error: null,
    message: null,
  },
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.isAuthinticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthinticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthinticated = false;
      state.user = {};
      state.error = action.payload;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  try {
  } catch (error) {}
};
