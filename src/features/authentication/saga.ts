import * as LocalAuthentication from 'expo-local-authentication';
import * as actions from './actions';

import { call, put, takeLatest } from 'redux-saga/effects';

import ActionTypes from './actionTypes';
import { handleSagaError } from '@root/src/utils';

async function authenticateAysnc() {
  return await LocalAuthentication.authenticateAsync({
    disableDeviceFallback: false,
  });
}

// function* authenticate({ payload }: ReturnType<typeof actions.authenticate>) {
function* authenticate() {
  try {
    const result: LocalAuthentication.LocalAuthenticationResult = yield call(authenticateAysnc);
    if (result.success) {
      yield put(actions.authenticateSuccess(result.success));
    } else if (result.error) {
      yield put(actions.authenticateError({
        messages: [result.error, result.warning ?? '']
      }));
    }
  } catch (error: unknown) {
    yield call(
      handleSagaError,
      error,
      actions.authenticateError
    );
  }
}

export default function* authenticationSaga() {
  yield takeLatest(ActionTypes.AUTHENTICATE, authenticate);
}