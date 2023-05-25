import React from "react";

import { createSlice } from "@reduxjs/toolkit";

export interface MessengerState {}

const initialState = {} as MessengerState;

const messengerSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessages(state, action) {
      console.log("he he, okila");
      console.log(action.payload);
      return { ...state };
    },
    getMessagesSuccess(state, action) {
      const { payload = {} } = action;
      return {
        ...state,
      };
    },
    getMessagesError(state, action) {
      const { payload = {} } = action;
      return {
        ...state,
      };
    },
  },
});

export const { getMessages, getMessagesSuccess, getMessagesError } =
  messengerSlice.actions;
export default messengerSlice.reducer;
