import React from "react";

import { createSlice } from "@reduxjs/toolkit";

export interface MessengerState {
  listMessages: any;
  statusPin: string;
}

const initialState = {
  listMessages: [],
  statusPin: 'unPin',
} as MessengerState;

const messengerSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessages(state, action) {
      return { ...state };
    },
    getMessagesSuccess(state, action) {
      return {
        ...state,
        listMessages: action.payload,
      };
    },
    getMessagesError(state, action) {
      return {
        ...state,
      };
    },
    requestPinMessages(state, action) {
      console.log("he he, okila");
      console.log(action.payload);
      return {
        ...state,
        statusPin:'Pinning'
      };
    },
    requestPinMessagesSuccess(state, action) {
      return {
        ...state,
        statusPin:'Pinned'
      };
    },
    requestPinMessagesError(state, action) {
      return {
        ...state,
      };
    },
    requestUnPinMessages(state, action) {
      return {
        ...state,
        statusPin:'Pinning'
      };
    },
    requestUnPinMessagesSuccess(state, action) {
      return {
        ...state,
        statusPin:'Pinned'
      };
    },
    requestUnPinMessagesError(state, action) {
      return {
        ...state,
      };
    },
    
  },
});

export const {
  getMessages,
  getMessagesSuccess,
  getMessagesError,
  requestPinMessages,
  requestPinMessagesSuccess,
  requestPinMessagesError,
  requestUnPinMessages,
  requestUnPinMessagesSuccess,
  requestUnPinMessagesError
} = messengerSlice.actions;
export default messengerSlice.reducer;
