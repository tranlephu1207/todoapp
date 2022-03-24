import * as actions from './actions';

import { EditMode, Todo } from './types.d';
import { arrayToMap, handleSagaError } from '@utils';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ActionTypes from './actionTypes';
import { selectTodoEditMode } from './selectors';
import { v4 as uuidv4 } from 'uuid';

function* resetEditMode() {
  const mode: EditMode = yield select(selectTodoEditMode);
  if (mode === 'edit') {
    yield put(actions.setTodoMode('add'));
  }
}

function* createTodo({ payload }: ReturnType<typeof actions.createTodo>) {
  try {
    const { content } = payload;
    const todo: Todo = {
      id: uuidv4(),
      title: content,
      createdAt: Date.now()
    };
    yield put(actions.createTodoSuccess(todo));
    /* Reset to add mode whenever delete, add, update todo */
    yield put(actions.setTodoMode('add'));
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
    /* Reset to add mode whenever delete, add, update todo */
    yield resetEditMode();
  } catch (error) {
    yield call(
      handleSagaError,
      error,
      actions.updateTodoError
    );
  }
}

function* deleteTodos({ payload }: ReturnType<typeof actions.deleteTodos>) {
  try {
    const { todos } = payload;
    const record = arrayToMap<Todo>('id', todos);
    yield put(actions.deleteTodosSuccess(record));
    /* Reset to add mode whenever delete, add, update todo */
    yield resetEditMode();
  } catch (error) {
    yield call(
      handleSagaError,
      error,
      actions.deleteTodosError
    );
  }
}

export default function* todoSaga() {
  yield takeLatest(ActionTypes.CREATE_TODO, createTodo);
  yield takeLatest(ActionTypes.UPDATE_TODO, updateTodo);
  yield takeEvery(ActionTypes.DELETE_TODOS, deleteTodos);
}