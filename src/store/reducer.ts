import { authenticationReducer } from '@services';
import { todoReducer } from '@features';

const rootReducer = {
  authentication: authenticationReducer,
  todo: todoReducer,
};

export default rootReducer;