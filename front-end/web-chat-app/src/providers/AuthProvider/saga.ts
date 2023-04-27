import { push } from "connected-react-router";
import _get from "lodash/get";
import { call, delay, put, takeEvery, takeLeading } from "redux-saga/effects";

import {
  registerRequest,
  registerRequestError,
  loginError,
  loginRequest,
  loginSuccess,
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
    console.log(data)
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
    console.log(data);
    if (data) {
      yield put(push("/home"));
      localStorage.setItem("op_token", data);
      window.location.reload();
    }
    // if (result.code && result.message) {
    //   yield put(loginError(result));
    // }
    // const { data, error } = result;


    
    // const loginAction = _get(data, "loginAction", "");
    // const termAndConditionStatus = _get(data, "termAndConditionStatus", "NA");
    // const refreshToken = _get(data, "refreshToken", "");
    // const otpRefId = _get(data, "otpRefId", "");

    // localStorage.setItem("termAndConditionStatus", termAndConditionStatus);

    // if (!token && loginAction === "CHANGE_PASSWORD") {
    //   localStorage.setItem("refId", otpRefId);
    //   if (termAndConditionStatus === "PENDING") {
    //     yield put(push("/firstLogin/OTPVerification"));
    //   } else yield put(push("/OTPVerification"));
    //   window.location.reload();
    //   // yield put(loginFirstTime());
    //   return;
    // }

    // if (!token) {
    //   yield put(loginError(error));
    //   return;
    // }

    // Helper.storeAuthToken(token);
    // Helper.storeAuthrefreshToken(refreshToken);

    // if (termAndConditionStatus === "PENDING") {
    //   yield put(push("/merchantAgreement"));
    //   window.location.reload();
    //   return;
    // }

    // const infoUser = yield callApi(api.get, "v1/merchant/user/profile");

    // // yield put(getProfileUserSuccess(infoUser.data));

    // if (infoUser.data.type === "CASHIER") {
    //   yield put(push("/transactions"));
    // } else {
    //   yield put(push("/storeManagement"));
    // }

    // window.location.reload();
    // yield put(loginSuccess(null));
  } catch (error) {
    yield put(loginError(error));
  }
}

export default function* watchAuth(): Generator {
  yield takeLeading(registerRequest.type, handleRegisterRequest);
  yield takeLeading(loginRequest.type, handleLogin);
}
