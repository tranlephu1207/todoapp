import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AppError } from '@types';

export interface AuthenticationState {
  error?: AppError;
}

export type AuthenticationActions = ActionType<typeof actions>;