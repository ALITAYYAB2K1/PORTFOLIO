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
    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    updatePasswordRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.error = null;
      state.message = action.payload;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
      state.message = null;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.error = null;
      state.message = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.error = null;
      state.message = action.payload;
    },
    updateProfileFailed: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
      state.message = null;
    },
    updateProfileResetAfterUpdate: (state, action) => {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    clearALLErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  clearALLErrors,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailed,
  logoutSuccess,
  logoutFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  updateProfileResetAfterUpdate,
} = userSlice.actions;

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

export const getUser = () => async (dispatch) => {
  dispatch(loadUserRequest());
  try {
    const { data } = await axios.get("http://localhost:8000/api/v1/user/me", {
      withCredentials: true, // ✅ Ensure cookies are sent
    });

    console.log("Login response received:", data); // ✅ Debugging

    dispatch(loadUserSuccess(data.user));
    dispatch(clearALLErrors());
  } catch (error) {
    dispatch(loadUserFailed(error.response?.data?.message || "some error"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      // ✅ Use GET if required by backend
      "http://localhost:8000/api/v1/user/logout",
      {
        withCredentials: true, // ✅ Ensure cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(logoutSuccess(data.message));
    dispatch(clearALLErrors());
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error); // ✅ Debugging
    dispatch(
      logoutFailed(error.response?.data?.message || "Error during logout")
    );
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(updatePasswordRequest());
    try {
      const { data } = await axios.patch(
        // ✅ Use GET if required by backend
        "http://localhost:8000/api/v1/user/update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true, // ✅ Ensure cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(updatePasswordSuccess(data.message));
      dispatch(clearALLErrors());
    } catch (error) {
      console.error("update password failed :", error.response?.data || error); // ✅ Debugging
      dispatch(
        updatePasswordFailed(
          error.response?.data?.message || "Error during password update"
        )
      );
    }
  };

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const { data } = await axios.put(
      // ✅ Use GET if required by backend
      "http://localhost:8000/api/v1/user/update/me",
      data,
      {
        withCredentials: true, // ✅ Ensure cookies are sent
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updateProfileSuccess(data.message));
    dispatch(clearALLErrors());
  } catch (error) {
    console.error("update profile failed :", error.response?.data || error); // ✅ Debugging
    dispatch(
      updateProfileFailed(
        error.response?.data?.message || "Error during profile update"
      )
    );
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(updateProfileResetAfterUpdate());
};
