import { TodoState } from '@features';
import { AuthenticationState } from '@services';

interface ApplicationRootState {
  authentication: AuthenticationState;
  todo: TodoState;
}