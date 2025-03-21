import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearALLErrors } from "./userSlice";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequst: (state) => {
      state.messages = [];
      state.loading = true;
      state.error = null;
    },
    getAllMessagesSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllMessagesFailed: (state, action) => {
      state.messages = state.message;
      state.loading = false;
      state.error = action.payload;
    },
    clearALLErrors: (state) => {
      state.error = null;
      state.messages = state.message;
    },
  },
});

export const {
  getAllMessagesRequst,
  getAllMessagesSuccess,
  getAllMessagesFailed,
} = messageSlice.actions;

export const getAllMessages = () => async (dispatch) => {
  dispatch(getAllMessagesRequst());
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/messages/getall",
      {
        withCredentials: true,
      }
    );
    dispatch(getAllMessagesSuccess(data.messages));
    dispatch(clearALLErrors());
  } catch (error) {
    dispatch(getAllMessagesFailed(error.response.data.message));
  }
};

export default messageSlice.reducer;
