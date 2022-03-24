import * as LocalAuthentication from 'expo-local-authentication';
import * as actions from './actions';

import { call, put, takeLatest } from 'redux-saga/effects';

import ActionTypes from './actionTypes';
import { BiometricType } from './types';
import { handleSagaError } from '@root/src/utils';

async function authenticateAysnc() {
  return await LocalAuthentication.authenticateAsync({
    disableDeviceFallback: false,
  });
}

async function hasHardwareAsync() {
  return await LocalAuthentication.hasHardwareAsync();
}

async function getSupportedAuthenticationTypes() {
  return await LocalAuthentication.supportedAuthenticationTypesAsync();
}

async function isEnrolledAsync() {
  return await LocalAuthentication.isEnrolledAsync();
}

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

function* checkBiometricSupported() {
  try {
    const compatible: boolean = yield call(hasHardwareAsync);
    yield put(actions.checkBiometricSupportedSuccess(compatible));
  } catch (error) {
    yield call(
      handleSagaError,
      error,
      actions.checkBiometricSupportedError,
    );
  }
}

function* getBiometricTypes() {
  try {
    const biometricTypes: BiometricType[] = yield call(getSupportedAuthenticationTypes);
    yield put(actions.getBiometricTypesSuccess(biometricTypes));
  } catch (error) {
    yield call(
      handleSagaError,
      error,
      actions.getBiometricTypesError,
    );
  }
}

function* checkSavedBiometrics() {
  try {
    const hasSavedBiometrics: boolean = yield call(isEnrolledAsync);
    yield put(actions.checkSavedBiometricsSuccess(hasSavedBiometrics));
  } catch (error) {
    yield call(
      handleSagaError,
      error,
      actions.checkSavedBiometricsError,
    );
  }
}

export default function* authenticationSaga() {
  yield takeLatest(ActionTypes.AUTHENTICATE, authenticate),
  yield takeLatest(ActionTypes.CHECK_BIOMETRIC_SUPPORTED, checkBiometricSupported);
  yield takeLatest(ActionTypes.GET_BIOMETRIC_TYPES, getBiometricTypes);
  yield takeLatest(ActionTypes.CHECK_SAVED_BIOMETRICS, checkSavedBiometrics);
}