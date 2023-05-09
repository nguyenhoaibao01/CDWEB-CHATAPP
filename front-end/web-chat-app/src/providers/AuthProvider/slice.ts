import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { push } from "connected-react-router";
import { useHistory } from "react-router-dom";

// import moment from 'moment';
// import Helper from 'utils/Helper';

interface User {
  address: null;
  avatarUrl: null;
  birthday: null;
  desc: null;
  email: string;
  enable: boolean;
  name: null;
  password: string;
  phone: null;
  role: string;
  token: null;
  verificationCode: string;
}
export interface AuthState {
  isLoading: boolean;
  currentUser: unknown;
  profileUser:   User;
  isAuthorizing: "idle" | "loading" | "success";
  contentMerchantAgreement: string;
  statusUpdateTC: string;
  userSearch: User;
  listUser:Array<User>;
  listFriendRequest:Array<User>;
}

const initialState = {
  isLoading: false,
  currentUser: {},
  profileUser: {},
  contentMerchantAgreement: "",
  statusUpdateTC: "",
  userSearch: {},
  listUser:{},
  listFriendRequest:{}
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest(state, action) {
      return { ...state, isLoading: true};
    },

    registerRequestError(state, action) {
      message.error(action.payload);
    },

    loginRequest(state, action) {
      return { ...state, isLoading: true};
    },
    loginSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
      };
    },
    loginError(state, action) {
      // Helper.convertMessage(action.payload);
      return { ...state, isLoading: false};
    },
    getProfile(state) {
      return { ...state, isLoading: true };
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
      return { ...state, isLoading: false};
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
    searchUserError(state, action) {},
    requestAddFriend(state, action) {
      console.log(action.payload);
      
      return { ...state, isLoading: false };
    },
    requestAddFriendSuccess(state, action) {
      message.success("Friend request sent successfully. Please wait for your friend to accept so you can send messages.")
    },
    requestAddFriendError(state, action) {
      message.error("Add Friend Error")
    },
    getListAddFriend(state) {
      return { ...state, isLoading: false };
    },
    getListAddFriendSuccess(state, action) {
      return { ...state, isLoading: false, listFriendRequest:action.payload };
    },
    getListAddFriendError(state) {
      return { ...state, isLoading: false };
    },
    getAllUser(state) {
      return { ...state, isLoading: false };
    },
    getAllUserSuccess(state, action) {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        listUser: action.payload,
      };
    },
    getAllUserError(state, action) {
      message.error("Get list all user error")
    },
    requestAcceptFriend(state, action) {
      return { ...state, isLoading: false };
    },
    requestAcceptFriendSuccess(state, action) {
      message.success("Accept friend request success")
      return {
        ...state,
        isLoading: false,
        listUser: action.payload,
      };
    },
    requestAcceptFriendError(state, action) {
      message.error("Accept friend request error")
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
  searchUserError,
  requestAddFriend,
  requestAddFriendSuccess,
  requestAddFriendError,
  getListAddFriend,
  getListAddFriendSuccess,
  getListAddFriendError,
  getAllUser,
  getAllUserSuccess,
  getAllUserError,
  requestAcceptFriend,
  requestAcceptFriendSuccess, 
  requestAcceptFriendError

} = authSlice.actions;

export default authSlice.reducer;
