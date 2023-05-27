import { push } from "connected-react-router";
// import _get from "lodash/get";
import { call, delay, put, takeEvery, takeLeading } from "redux-saga/effects";

import {
  getMessages,
  getMessagesSuccess,
  getMessagesError,
} from "providers/MessengerProvider/slice";
import { callApi } from "providers/GeneralProvider/saga";
import api from "utils/service";
import Helper from "utils/Helper";
import { message } from "antd";

export function* handleGetMessages(action: any) {
  console.log("jjjj nhi", action.payload);
  try {
    const { data } = yield callApi(api.get, `rooms/${action.payload}/messages`);
    yield put(getMessagesSuccess(data));
  } catch (error) {
    yield put(getMessagesError(error.message));
  }
}

export default function* watchMessages(): Generator {
  yield takeEvery(getMessages.type, handleGetMessages);
}
