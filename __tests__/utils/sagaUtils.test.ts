import * as todoActions from '@features/todo/actions';

import { handleSagaError } from '@root/src/utils';

describe('test sagaUtils', () => {
  it('should handleSagaError', () => {
    const err: unknown = {
      message: 'unknown error'
    };
    const gen = handleSagaError(err, todoActions.createTodoError);
    expect(gen.next().done).toBeTruthy();
  });
});