import { authenticationReducer, todoReducer } from '@features';

const rootReducer = {
  authentication: authenticationReducer,
  todo: todoReducer,
};

export default rootReducer;