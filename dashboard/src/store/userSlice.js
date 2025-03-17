import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false, // Also, fix typo: "isAuthenticated"
    error: null,
    message: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
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
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginRequest());
    try {
      console.log("Sending login request with:", { email, password }); // ✅ Debugging

      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true, // ✅ Ensure cookies are sent
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login response received:", data); // ✅ Debugging

      dispatch(loginSuccess(data));
      dispatch(clearALLErrors());
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error
      ); // ✅ Debugging
      dispatch(loginFailed(error.response?.data?.message || "Login failed"));
    }
  };

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(clearALLErrors());
};
