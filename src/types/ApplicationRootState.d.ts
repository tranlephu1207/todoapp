import { TodoState, AuthenticationState } from '@features';

interface ApplicationRootState {
  authentication: AuthenticationState;
  todo: TodoState;
}