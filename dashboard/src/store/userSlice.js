import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthinticated: false, // Also, fix typo: "isAuthenticated"
    error: null,
    message: null,
  },
  reducers: {
    loginRequest: (state) => {
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
    clearALLErrors: (state) => {
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailed, clearALLErrors } =
  userSlice.actions;

// Fix: Correct export of reducer
export const userReducers = userSlice.reducer;

// Async login function
export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(loginSuccess(data));
    dispatch(clearALLErrors());
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};
