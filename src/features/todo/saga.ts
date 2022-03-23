import * as actions from './actions';

import { call, put, takeLatest } from 'redux-saga/effects';

import ActionTypes from './actionTypes';
import { Todo } from './types.d';
import { handleSagaError } from '@utils';
import { v4 as uuidv4 } from 'uuid';

function* createTodo({ payload }: ReturnType<typeof actions.createTodo>) {
  try {
    const { content } = payload;
    const todo: Todo = {
      id: uuidv4(),
      title: content,
      createdAt: Date.now()
    };
    yield put(actions.createTodoSuccess(todo));
  } catch (error) {
    yield call(
      handleSagaError,
      error,
      actions.createTodoError
    );
  }
}

export default function* todoSaga() {
  yield takeLatest(ActionTypes.CREATE_TODO, createTodo);
}