import { AuthenticationActions, AuthenticationState } from './types';

import ActionTypes from './actionTypes';

export const authenticationInitialState: AuthenticationState = {
  error: undefined,
  authenticated: false,
  biometricTypes: [],
  hasSavedBiometrics: false,
  isBiometricSupported: false,
};

export default function authenticationReducer(
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
    default:
      return state;
  }
}