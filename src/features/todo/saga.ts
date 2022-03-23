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

function* updateTodo({ payload }: ReturnType<typeof actions.updateTodo>) {
  try {
    const { todo } = payload;
    yield put(actions.updateTodoSuccess(todo));
  } catch (error) {
    yield call(
      handleSagaError,
      error,
      actions.updateTodoError
    );
  }
}

export default function* todoSaga() {
  yield takeLatest(ActionTypes.CREATE_TODO, createTodo);
  yield takeLatest(ActionTypes.UPDATE_TODO, updateTodo);
}