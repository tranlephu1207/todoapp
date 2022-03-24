import ActionTypes from './actionTypes';
import { AppError } from '@types';
import { BiometricType } from './types';
import { action } from 'typesafe-actions';

/**
 * Actions to authenticate
 */
export const authenticate = () => {
  return action(ActionTypes.AUTHENTICATE);
};

export const authenticateSuccess = (authenticated: boolean) => {
  return action(ActionTypes.AUTHENTICATE_SUCCESS, { authenticated });
};

export const authenticateError = (error: AppError) => {
  return action(ActionTypes.AUTHENTICATE_ERROR, { error });
};

/**
 * Actions to check biometric supported
 */
export const checkBiometricSupported = () => {
  return action(ActionTypes.CHECK_BIOMETRIC_SUPPORTED);
};

export const checkBiometricSupportedSuccess = (compatible: boolean) => {
  return action(ActionTypes.CHECK_BIOMETRIC_SUPPORTED_SUCCESS, { compatible });
};

export const checkBiometricSupportedError = (error: AppError) => {
  return action(ActionTypes.CHECK_BIOMETRIC_SUPPORTED_ERROR, { error });
};

/**
 * Actions to get biometric types
 */
export const getBiometricTypes = () => {
  return action(ActionTypes.GET_BIOMETRIC_TYPES);
};

export const getBiometricTypesSuccess = (types: BiometricType[]) => {
  return action(ActionTypes.GET_BIOMETRIC_TYPES_SUCCESS, { types });
};

export const getBiometricTypesError = (error: AppError) => {
  return action(ActionTypes.GET_BIOMETRIC_TYPES_ERROR, { error });
};

/**
 * Actions to check saved biometrics
 */
export const checkSavedBiometrics = () => {
  return action(ActionTypes.CHECK_SAVED_BIOMETRICS);
};

export const checkSavedBiometricsSuccess = (isSaved: boolean) => {
  return action(ActionTypes.CHECK_SAVED_BIOMETRICS_SUCCESS, { isSaved });
};

export const checkSavedBiometricsError = (error: AppError) => {
  return action(ActionTypes.CHECK_SAVED_BIOMETRICS_ERROR, { error });
};

/**
 * Actions to reset authentication
 */
export const resetAuthentication = () => {
  return action(ActionTypes.RESET_AUTHENTICATION);
};