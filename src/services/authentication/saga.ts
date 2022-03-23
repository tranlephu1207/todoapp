import * as actions from './actions';

import { put, takeLatest } from 'redux-saga/effects';

import ActionTypes from './actionTypes';

// function* authenticate({ payload }: ReturnType<typeof actions.authenticate>) {
function* authenticate() {
  try {
    yield put(actions.authenticateSuccess());
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(
        actions.authenticateError({
          messages: [error.message ?? 'Unknown Error']
        })
      );
    }
  }
}

export default function* authenticationSaga() {
  yield takeLatest(ActionTypes.AUTHENTICATE, authenticate);
}