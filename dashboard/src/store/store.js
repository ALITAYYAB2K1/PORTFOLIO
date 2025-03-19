import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./userSlice.js"; // ✅ Now correctly imported
import { forgotPasswordSlice } from "./forgotResetPasswordSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducers,
    forgotPassword: forgotPasswordSlice,
  },
});
