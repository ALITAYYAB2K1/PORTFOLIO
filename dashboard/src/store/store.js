import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./userSlice.js"; // ✅ Now correctly imported

export const store = configureStore({
  reducer: {
    user: userReducers, // ✅ Now correctly referenced
  },
});
