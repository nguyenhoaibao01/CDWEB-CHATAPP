import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { push } from "connected-react-router";
import { useHistory } from 'react-router-dom';

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
}

const initialState = {
  isAuthorizing: "idle",
  isLoading: false,
  currentUser: {},
  profileUser: {},
  statusLogin: {},
  contentMerchantAgreement: "",
  statusUpdateTC: "",
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
      history.push('/changePasswordLoginFirstTime');
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
  }
});

export const {
  registerRequest,
  registerRequestError,
  loginRequest,
  loginSuccess,
  loginError,
} = authSlice.actions;

export default authSlice.reducer;
