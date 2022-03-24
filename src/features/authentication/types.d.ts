import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AppError } from '@types.d';
import { AuthenticationType } from 'expo-local-authentication';

export type BiometricType = AuthenticationType;

export interface AuthenticationState {
  error?: AppError;

  isBiometricSupported?: boolean;
  biometricTypes?: BiometricType[];

  hasSavedBiometrics?: boolean;

  authenticated: boolean;
}

export type AuthenticationActions = ActionType<typeof actions>;