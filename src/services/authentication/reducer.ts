import { AuthenticationActions, AuthenticationState } from './types';

import ActionTypes from './actionTypes';

export const initialState: AuthenticationState = {
  error: undefined,
};

export default function authenticationReducer(
  state: AuthenticationState = initialState,
  action: AuthenticationActions
): AuthenticationState {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE: {
      return state;
    }
    case ActionTypes.AUTHENTICATE_SUCCESS: {
      return state;
    }
    case ActionTypes.AUTHENTICATE_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error
      };
    }
    default:
      return state;
  }
}