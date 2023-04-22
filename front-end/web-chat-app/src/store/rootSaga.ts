import { all } from 'redux-saga/effects';
import watchAuth from 'providers/AuthProvider/saga';

export default function* rootSaga(): Generator {
  yield all([
    watchAuth(),

  ]);
}
