import ActionTypes from './actionTypes';
import { AppError } from '@types';
import { action } from 'typesafe-actions';

export const authenticate = () => {
  return action(ActionTypes.AUTHENTICATE);
};

export const authenticateSuccess = () => {
  return action(ActionTypes.AUTHENTICATE_SUCCESS);
};

export const authenticateError = (error: AppError) => {
  return action(ActionTypes.AUTHENTICATE_ERROR, { error });
};