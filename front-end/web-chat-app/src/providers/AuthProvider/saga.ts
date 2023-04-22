import { push } from 'connected-react-router';
import _get from 'lodash/get';
import { call, delay, put, takeEvery, takeLeading } from 'redux-saga/effects';

import {
  getCurrentUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getProfileUserRequest,
  getProfileUserSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  loginFirstTime,
  getMerchantAgreementRequest,
  getMerchantAgreementSuccess,
  getMerchantAgreementError,
  updateTermConditionsRequest,
  updateTermConditionsSuccess,
  updateTermConditionsError,
} from 'providers/AuthProvider/slice';
import { callApi } from 'providers/GeneralProvider/saga';
import api from 'utils/service';
import apiEncrypt from 'utils/fetchApi';
import Helper from 'utils/Helper';

function* handleLogin(action) {
  try {
    // NOTE: Replace with your api and configuration

    const result = yield callApi(apiEncrypt.post, 'v1/authentication/login', action.payload);

    if (result.code && result.message) {
      yield put(loginError(result));
    }
    const { data, error } = result;

    const token = _get(data, 'accessToken', '');
    const loginAction = _get(data, 'loginAction', '');
    const termAndConditionStatus = _get(data, 'termAndConditionStatus', 'NA');
    const refreshToken = _get(data, 'refreshToken', '');
    const otpRefId = _get(data, 'otpRefId', '');

    localStorage.setItem('termAndConditionStatus', termAndConditionStatus);

    if (!token && loginAction === 'CHANGE_PASSWORD') {
      localStorage.setItem('refId', otpRefId);
      if (termAndConditionStatus === 'PENDING') {
        yield put(push('/firstLogin/OTPVerification'));
      } else yield put(push('/OTPVerification'));
      window.location.reload();
      yield put(loginFirstTime());
      return;
    }

    if (!token) {
      yield put(loginError(error));
      return;
    }

    Helper.storeAuthToken(token);
    Helper.storeAuthrefreshToken(refreshToken);

    if (termAndConditionStatus === 'PENDING') {
      yield put(push('/merchantAgreement'));
      window.location.reload();
      return;
    }

    const infoUser = yield callApi(api.get, 'v1/merchant/user/profile');

    yield put(getProfileUserSuccess(infoUser.data));

    if (infoUser.data.type === 'CASHIER') {
      yield put(push('/transactions'));
    } else {
      yield put(push('/storeManagement'));
    }

    window.location.reload();
    yield put(loginSuccess(null));
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* handleGetProfileUser() {
  try {
    const infoUser = yield callApi(api.get, 'v1/merchant/user/profile');
    if (infoUser.data) {
      yield put(getProfileUserSuccess(infoUser.data));
    }
    if (infoUser.data.photo) {
      const apigetAvatar = api.get(`v1/merchant/avatars/${infoUser.data.photo}`);

      const imageList = yield call(() => Promise.all([apigetAvatar]));

      infoUser.data.avatar = imageList[0];
      yield put(getProfileUserSuccess(infoUser.data));
    }
  } catch (error) {
    yield put(logoutRequest());
  }
}

export function* handleLogout(): Generator {
  try {
    // Need to call api logout to delete sessionToken on server without waiting until it finishes
    // use Call of redux-saga effect, not callApi
    // call(api.put, '/account/admin/logout');
    yield callApi(api.post, '/v1/authentication/logout');
    Helper.removeAuthToken();
    Helper.removeAuthrefreshToken();
    localStorage.clear();
    window.location.reload();
  } catch (error) {
    Helper.removeAuthToken();
    Helper.removeAuthrefreshToken();
    window.location.reload();
    localStorage.clear();
    yield put(logoutError());
  }
}

export function* getCurrentUser(): Generator {
  try {
    yield delay(3000);
    yield put(getCurrentUserSuccess(null));
  } catch (error) {
    yield put(getCurrentUserError());
  }
}

export function* handleGetMerchantAgreement(): Generator {
  try {
    const data: any = yield callApi(api.get, '/v1/merchant/term-and-conditions/MERCHANT');
    const id = data?.id || '';
    localStorage.setItem('idTC', id);
    yield put(getMerchantAgreementSuccess(data.content));
  } catch (error) {
    yield put(getMerchantAgreementError(error));
  }
}

export function* handleUpdateTermConditions(action): Generator {
  try {
    const result: any = yield callApi(api.put, 'v1/authentication/users/term-and-conditions', {
      ...action.payload,
    });
    const { data } = result;

    const token = _get(data, 'token', '');
    const refreshToken = _get(data, 'refreshToken', '');
    Helper.storeAuthToken(token);
    Helper.storeAuthrefreshToken(refreshToken);

    yield put(updateTermConditionsSuccess(data));
  } catch (error) {
    yield put(updateTermConditionsError(error));
  }
}

export default function* watchAuth(): Generator {
  yield takeLeading(loginRequest.type, handleLogin);
  yield takeLeading(logoutRequest.type, handleLogout);
  yield takeEvery(getCurrentUserRequest.type, getCurrentUser);
  yield takeEvery(getProfileUserRequest.type, handleGetProfileUser);
  yield takeEvery(getMerchantAgreementRequest.type, handleGetMerchantAgreement);
  yield takeEvery(updateTermConditionsRequest.type, handleUpdateTermConditions);
}
