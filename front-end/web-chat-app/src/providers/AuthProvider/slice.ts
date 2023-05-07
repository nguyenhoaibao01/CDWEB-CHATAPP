import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { push } from "connected-react-router";
import { useHistory } from "react-router-dom";

// import moment from 'moment';
// import Helper from 'utils/Helper';

export interface AuthState {
  isLoading: boolean;
  statusLogin: string;
  currentUser: unknown;
  profileUser: any;
  isAuthorizing: "idle" | "loading" | "success";
  contentMerchantAgreement: string;
  statusUpdateTC: string;
  userSearch:any;
}

const initialState = {
  isAuthorizing: "idle",
  isLoading: false,
  currentUser: {},
  profileUser: {},
  statusLogin: {},
  contentMerchantAgreement: "",
  statusUpdateTC: "",
  userSearch:{}
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest(state, action) {
      return { ...state, isLoading: true, statusLogin: "loading" };
    },
    loginFirstTime(state) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const history = useHistory();
      history.push("/changePasswordLoginFirstTime");
    },

    registerRequestError(state, action) {
      message.error(action.payload);
    },

    loginRequest(state, action) {
      return { ...state, isLoading: true, statusLogin: "loading" };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthorizing: "success",
        statusLogin: "success",
      };
    },
    loginError(state, action) {
      // Helper.convertMessage(action.payload);
      return { ...state, isLoading: false, statusLogin: "failded" };
    },
    getProfile(state) {
      return { ...state, isLoading: true, statusLogin: "loading" };
    },
    getProfileSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        profileUser: action.payload,
      };
    },
    getProfileError(state, action) {
      // Helper.convertMessage(action.payload);
      return { ...state, isLoading: false, statusLogin: "failded" };
    },
    searchUser(state, action) {
      return { ...state, isLoading: false };
    },
    searchUserSuccess(state, action) {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        userSearch: action.payload,
      };
    },
    searchUserError(state, action) {

    },

  },
});

export const {
  registerRequest,
  registerRequestError,
  loginRequest,
  loginSuccess,
  loginError,
  getProfile,
  getProfileSuccess,
  getProfileError,
  searchUser,
  searchUserSuccess,
  searchUserError
} = authSlice.actions;

export default authSlice.reducer;
