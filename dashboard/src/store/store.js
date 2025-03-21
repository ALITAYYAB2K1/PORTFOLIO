import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./userSlice.js";
import { forgotPasswordSlice } from "./forgotResetPasswordSlice.js";
import messagesReducer from "./messageSlice.js";
import timelineReducer from "./timelineSlice.js";
import skillReducer from "./skillSlice.js"; // Import the skill reducer

export const store = configureStore({
  reducer: {
    user: userReducers,
    forgotPassword: forgotPasswordSlice,
    messages: messagesReducer,
    timeline: timelineReducer,
    skill: skillReducer, // Add the skill reducer
  },
});
