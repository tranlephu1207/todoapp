import { AuthenticationActions, AuthenticationState } from './types';

import ActionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

export const authenticationInitialState: AuthenticationState = {
  error: undefined,
  authenticated: false,
  biometricTypes: undefined,
  hasSavedBiometrics: undefined,
  isBiometricSupported: undefined,
};

function authenticationReducer(
  state: AuthenticationState = authenticationInitialState,
  action: AuthenticationActions
): AuthenticationState {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE: {
      return state;
    }
    case ActionTypes.AUTHENTICATE_SUCCESS: {
      const { authenticated } = action.payload;
      return {
        ...state,
        authenticated,
      };
    }
    case ActionTypes.AUTHENTICATE_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error
      };
    }
    case ActionTypes.RESET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: false,
      };
    }
    case ActionTypes.CHECK_BIOMETRIC_SUPPORTED:
    case ActionTypes.GET_BIOMETRIC_TYPES:
    case ActionTypes.CHECK_SAVED_BIOMETRICS: {
      return state;
    }
    case ActionTypes.CHECK_BIOMETRIC_SUPPORTED_ERROR:
    case ActionTypes.GET_BIOMETRIC_TYPES_ERROR:
    case ActionTypes.CHECK_SAVED_BIOMETRICS_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    case ActionTypes.CHECK_BIOMETRIC_SUPPORTED_SUCCESS: {
      const { compatible } = action.payload;
      return {
        ...state,
        isBiometricSupported: compatible,
      };
    }
    case ActionTypes.GET_BIOMETRIC_TYPES_SUCCESS: {
      const { types } = action.payload;
      return {
        ...state,
        biometricTypes: types
      };
    }
    case ActionTypes.CHECK_SAVED_BIOMETRICS_SUCCESS: {
      const { isSaved } = action.payload;
      return {
        ...state,
        hasSavedBiometrics: isSaved
      };
    }
    default:
      return state;
  }
}

const authenticationPersistConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  blacklist: ['authenticated'],
};

export default persistReducer(authenticationPersistConfig, authenticationReducer);