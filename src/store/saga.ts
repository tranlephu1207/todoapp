import { authenticationSaga, todoSaga } from '@features';

import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield fork(authenticationSaga);
  yield fork(todoSaga);
}