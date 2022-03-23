import { ApplicationRootState } from '@types';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const authenticationSelector = (state: ApplicationRootState) => {
  return state.authentication ?? initialState;
};

export const selectAuthenticationError = createSelector(
  authenticationSelector,
  (state) => state.error
);