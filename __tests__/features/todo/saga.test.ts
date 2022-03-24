import * as actions from '@features/todo/actions';
import * as todoSaga from '@features/todo/saga';

import { arrayToMap, createRandomTodo, createRandomTodos, handleSagaError } from '@utils';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ActionTypes from '@features/todo/actionTypes';
import { AppError } from '@root/src/types';
import { Todo } from '@features/todo/types.d';
import { selectTodoEditMode } from '@features/todo/selectors';
import watchTodoSaga from '@features/todo/saga';

jest.mock('uuid', () => ({ v4: () => 'adfd01fb-309b-4e1c-9117-44d003f5d7fc' }));

Date.now = jest.fn(() => 1487076708000);

describe('createTodo()', () => {
  const content = 'create todo';
  it('try', () => {
    const gen = todoSaga.createTodo(actions.createTodo(content));
    const randomTodo = createRandomTodo(content);
    expect(gen.next().value).toEqual(put(actions.createTodoSuccess(randomTodo)));
    expect(gen.next().value).toEqual(put(actions.setTodoMode('add')));
    expect(gen.next().done).toBeTruthy();
  });

  it('catch', () => {
    const error: AppError = {
      messages: ['create todo error']
    };
    const gen = todoSaga.createTodo(actions.createTodo(content));
    gen.next();
    expect(gen.throw(error).value).toEqual(call(handleSagaError, error, actions.createTodoError));
  });
});

describe('updateTodo()', () => {
  const randomTodo = createRandomTodo('update todo');

  it('try', () => {
    const gen = todoSaga.updateTodo(actions.updateTodo(randomTodo));
    expect(gen.next().value).toEqual(put(actions.updateTodoSuccess(randomTodo)));
    expect(gen.next().value).toEqual(todoSaga.resetEditMode());
    expect(gen.next().done).toBeTruthy();
  });

  it('catch', () => {
    const error: AppError = {
      messages: ['update todo error']
    };
    const gen = todoSaga.updateTodo(actions.updateTodo(randomTodo));
    gen.next();
    expect(gen.throw(error).value).toEqual(call(handleSagaError, error, actions.updateTodoError));
  });
});

describe('deleteTodos()', () => {
  const randomeTodos = createRandomTodos();

  it('try', () => {
    const gen = todoSaga.deleteTodos(actions.deleteTodos(randomeTodos));
    const record = arrayToMap<Todo>('id', randomeTodos);
    expect(gen.next().value).toEqual(put(actions.deleteTodosSuccess(record)));
    expect(gen.next().value).toEqual(todoSaga.resetEditMode());
    expect(gen.next().done).toBeTruthy();
  });

  it('catch', () => {
    const error: AppError = {
      messages: ['delete todos error']
    };
    const gen = todoSaga.deleteTodos(actions.deleteTodos(randomeTodos));
    gen.next();
    expect(gen.throw(error).value).toEqual(call(handleSagaError, error, actions.deleteTodosError));
  });
});

describe('resetEditMode()', () => {
  it('should test resetEditMode()', () => {
    const gen = todoSaga.resetEditMode();
    expect(gen.next().value).toEqual(select(selectTodoEditMode));
    expect(gen.next('edit').value).toEqual(put(actions.setTodoMode('add')));
    expect(gen.next().done).toBeTruthy();
  });
});

describe('todoSaga()', () => {
  const gen = watchTodoSaga();
  it('should trigger on CREATE_TODO', () => {
    const expectedYield = takeLatest(ActionTypes.CREATE_TODO, todoSaga.createTodo);
    expect(gen.next().value).toEqual(expectedYield);
  });

  it('should trigger on UPDATE_TODO', () => {
    const expectedYield = takeLatest(ActionTypes.UPDATE_TODO, todoSaga.updateTodo);
    expect(gen.next().value).toEqual(expectedYield);
  });

  it('should trigger on DELETE_TODOS', () => {
    const expectedYield = takeEvery(ActionTypes.DELETE_TODOS, todoSaga.deleteTodos);
    expect(gen.next().value).toEqual(expectedYield);
  });
});