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
    clearALLErrors: (state, action) => {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(userSlice.actions.loginSuccess(data));
    dispatch(userSlice.actions.clearALLErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export default userSlice.reducer;
