import React from "react";

import { createSlice } from "@reduxjs/toolkit";

export interface GeneralState {
  isLoading: boolean;
  confirmModal: {
    visible: boolean;
    data: any;
  };
  modelData: {
    visible: boolean;
    data: any;
  };
}

const initialState = {
  isLoading: false,
  confirmModal: {
    visible: false,
    data: {},
  },
  modelData: {
    visible: false,
    data: {},
  },
} as GeneralState;

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setFormModal(state, action) {
      const { payload = {} } = action;
      return { ...state, [payload.key]: payload };
    },
    resetDataFormModal(state, action) {
      const { payload = {} } = action;
      return { ...state, [payload.key]: null };
    },
    setModelData(state, action) {
      console.log(action);

      return {
        ...state,
        modelData: {
          visible: action.payload.visible,
          data: action.payload.data || state.modelData.data,
        },
      };
    },
    resetModelData(state) {
      return {
        ...state,
        modelData: {
          ...state.modelData,
          data: {},
        },
      };
    },
    setConfirmModal(state, action) {
      return {
        ...state,
        confirmModal: {
          visible: action.payload.visible,
          data: action.payload.data || state.confirmModal.data,
        },
      };
    },
    resetConfirmModal(state) {
      return {
        ...state,
        confirmModal: {
          ...state.confirmModal,
          data: {},
        },
      };
    },
  },
});

export const {
  setFormModal,
  resetDataFormModal,
  setConfirmModal,
  resetConfirmModal,
  setModelData,
  resetModelData,
} = generalSlice.actions;
export default generalSlice.reducer;
