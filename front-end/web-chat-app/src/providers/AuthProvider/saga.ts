import { push } from "connected-react-router";
import _get from "lodash/get";
import { call, delay, put, takeEvery, takeLeading } from "redux-saga/effects";

import {
  registerRequest,
  registerRequestError,
  loginError,
  loginRequest,
  loginSuccess,
  getProfile,
  getProfileSuccess,
  getProfileError,
  searchUser,
  searchUserSuccess,
  searchUserError
} from "providers/AuthProvider/slice";
import { callApi } from "providers/GeneralProvider/saga";
import api from "utils/service";
import apiEncrypt from "utils/fetchApi";
import Helper from "utils/Helper";
import { message } from "antd";
import { log } from "console";

export function* handleRegisterRequest(action: any) {
  try {
    const { data } = yield callApi(api.post, "register", action.payload);
    console.log(data);
    message.success(data);
    yield put(push("/login"));
    window.location.reload();
  } catch (error) {
    console.log(error.message);
    yield put(registerRequestError(error.message));
  }
}
function* handleLogin(action) {
  try {
    // NOTE: Replace with your api and configuration

    const { data } = yield callApi(api.post, "auth", action.payload);
    if (data) {
      yield put(push("/home"));
      localStorage.setItem("op_token", data);
      window.location.reload();
    }
  } catch (error) {
    yield put(loginError(error));
  }
}
export function* handleGetProfile(action: any) {
  try {
    const { data } = yield callApi(api.get, 'users/me');
    yield put(getProfileSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getProfileError(error));
  }
}
export function* handleSearchUser(action: any) {
  try {
    console.log(action.payload);
    
    const { data } = yield callApi(api.get, `users/${action.payload}`);
    yield put(searchUserSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(searchUserError(error));
  }
}

export default function* watchAuth(): Generator {
  yield takeLeading(registerRequest.type, handleRegisterRequest);
  yield takeLeading(loginRequest.type, handleLogin);
  yield takeLeading(getProfile.type, handleGetProfile);
  yield takeLeading(searchUser.type, handleSearchUser);

}
