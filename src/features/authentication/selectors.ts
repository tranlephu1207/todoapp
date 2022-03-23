import { ApplicationRootState } from '@types';
import { authenticationInitialState } from './reducer';
import { createSelector } from 'reselect';

const authenticationSelector = (state: ApplicationRootState) => {
  return state.authentication ?? authenticationInitialState;
};

export const selectAuthenticated = createSelector(
  authenticationSelector,
  (state) => state.authenticated
);

export const selectAuthenticationError = createSelector(
  authenticationSelector,
  (state) => state.error
);