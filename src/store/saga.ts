import { authenticationSaga } from '@services';
import { fork } from 'redux-saga/effects';
import { todoSaga } from '@features';

export default function* rootSaga() {
  yield fork(authenticationSaga);
  yield fork(todoSaga);
}