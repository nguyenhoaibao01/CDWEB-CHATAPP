import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';
import { useHistory } from 'react-router-dom';
// import Helper from 'utils/Helper';

export interface AuthState {
  isLoading: boolean;
  statusLogin: string;
  currentUser: unknown;
  profileUser: any;
  isAuthorizing: 'idle' | 'loading' | 'success';
  contentMerchantAgreement: string;
  statusUpdateTC: string;
}

const initialState = {
  isAuthorizing: 'idle',
  isLoading: false,
  currentUser: {},
  profileUser: {},
  statusLogin: {},
  contentMerchantAgreement: '',
  statusUpdateTC: '',
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeStatusLogin(state, action) {
      return { ...state, isLoading: true, statusLogin: action.payload };
    },
    loginRequest(state, action) {
      return { ...state, isLoading: true, statusLogin: 'loading' };
    },
    loginSuccess(state, action) {
      return { ...state, isLoading: false, isAuthorizing: 'success', statusLogin: 'success' };
    },
    loginError(state, action) {
      // Helper.convertMessage(action.payload);
      return { ...state, isLoading: false, statusLogin: 'failded' };
    },
    loginFirstTime(state) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const history = useHistory();
      history.push('/changePasswordLoginFirstTime');
    },
    getCurrentUserRequest(state, action) {
      return {
        ...state,
        isLoading: true,
        isAuthorizing: action.payload.isAuthorizing ? 'loading' : state.isAuthorizing,
      };
    },
    getCurrentUserSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        isAuthorizing: 'success',
      };
    },
    getCurrentUserError(state) {
      return { ...state, isLoading: false, isAuthorizing: 'idle' };
    },
    logoutRequest(state) {
      return { ...state, isLoading: true };
    },
    logoutSuccess(state) {
      return { ...state, isLoading: false };
    },
    logoutError(state) {
      return { ...state, isLoading: false };
    },
    changePasswordRequest(state, action) {
      return { ...state, isLoading: true };
    },
    changePasswordSuccess(state, action) {
      return { ...state, isLoading: false };
    },
    getProfileUserSuccess: (state, action) => {
      const storeIds = action.payload?.stores?.map((item) => item.id);
      const data = {
        ...action.payload,
        // dayOfBirth: moment(new Date(action.payload.dayOfBirth)),
        storeIds,
      };
      state.profileUser = data;
    },
    getProfileUserRequest(state) {
      return { ...state };
    },
    getMerchantAgreementRequest(state) {
      return { ...state, isLoading: false };
    },
    getMerchantAgreementSuccess: (state, action) => {
      state.contentMerchantAgreement = action.payload;
    },
    getMerchantAgreementError: (state, action) => {
      console.log('errorGetMerchantAgreementError');
    },
    updateTermConditionsRequest(state, action) {
      return { ...state, isLoading: true, statusUpdateTC: 'updating' };
    },
    updateTermConditionsSuccess: (state, action) => {
      state.statusUpdateTC = 'done';
      state.isLoading = false;
    },
    updateTermConditionsError(state, action) {
      // Helper.convertMessage(action.payload);
      return { ...state, isLoading: false, statusUpdateTC: 'failded' };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  getCurrentUserRequest,
  loginError,
  getCurrentUserSuccess,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserError,
  changePasswordRequest,
  changePasswordSuccess,
  getProfileUserSuccess,
  getProfileUserRequest,
  loginFirstTime,
  changeStatusLogin,
  getMerchantAgreementRequest,
  getMerchantAgreementSuccess,
  getMerchantAgreementError,
  updateTermConditionsRequest,
  updateTermConditionsSuccess,
  updateTermConditionsError,
} = authSlice.actions;

export default authSlice.reducer;
