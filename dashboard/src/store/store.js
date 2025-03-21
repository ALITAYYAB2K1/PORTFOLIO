import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./userSlice.js"; // ✅ Now correctly imported
import { forgotPasswordSlice } from "./forgotResetPasswordSlice.js";
import messagesReducer from "./messageSlice.js"; // ✅ Now correctly imported

export const store = configureStore({
  reducer: {
    user: userReducers,
    forgotPassword: forgotPasswordSlice,
    messages: messagesReducer,
  },
});
