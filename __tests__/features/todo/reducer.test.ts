import { Todo, TodoState } from '@root/src/features';
import { arrayToMap, createRandomTodo, createRandomTodos } from '@utils';
import todoReducer, { todoInitialState } from '@features/todo/reducer';

import ActionTypes from '@features/todo/actionTypes';
import { AppError } from '@types';
import update from 'immutability-helper';

jest.mock('uuid', () => ({ v4: () => 'adfd01fb-309b-4e1c-9117-44d003f5d7fc' }));

Date.now = jest.fn(() => 1487076708000);

describe('todoReducer', () => {
  it('should return initial state', () => {
    expect(todoReducer(undefined, {})).toEqual(todoInitialState);
  });

  it('should handle CREATE_TODO/UPDATE_TODO/DELETE_TODOS', () => {
    const type = ActionTypes.CREATE_TODO;
    const action = { type };
    const reducerReturnValue = todoReducer(todoInitialState, action);
    expect(reducerReturnValue.isLoading).toBe(true);
    expect(reducerReturnValue.error).toBe(undefined);
  });

  it('should handle CREATE_TODO_SUCCESS/UPDATE_TODO_SUCCESS', () => {

    const randomTodo = createRandomTodo('create todo');
    const randomTodos = createRandomTodos();

    const intialState: TodoState = {
      ...todoInitialState,
      todos: arrayToMap<Todo>('id', randomTodos)
    };
    const action = {
      type: ActionTypes.CREATE_TODO_SUCCESS,
      payload: { todo: randomTodo }
    };

    const reducerReturnValue = todoReducer(intialState, action);
    const isContained = !!intialState.todos[randomTodo.id];
    expect(reducerReturnValue.isLoading).toEqual(false);
    expect(isContained).toBe(true);
  });

  it('should handle CREATE_TODO_ERROR/UPDATE_TODO_ERROR/DELETE_TODOS_ERROR', () => {
    const error: AppError = {
      messages: ['create todo error']
    };

    const action = {
      type: ActionTypes.CREATE_TODO_ERROR,
      payload: { error }
    };
    const reducerReturnValue = todoReducer(todoInitialState, action);
    expect(reducerReturnValue.isLoading).toEqual(false);
    expect(reducerReturnValue.error).toBe(error);
  });

  it('should handle CHANGE_TODO_CONTENT', () => {
    const content = 'change todo content';

    const action = {
      type: ActionTypes.CHANGE_TODO_CONTENT,
      payload: { content }
    };
    const reducerReturnValue = todoReducer(todoInitialState, action);
    expect(reducerReturnValue.content).toBe(content);
  });

  it('should handle SET_TODO_MODE add -> edit', () => {
    const mode = 'edit';
    const randomTodo = createRandomTodo('set todo mode edit');
    const action = {
      type: ActionTypes.SET_TODO_MODE,
      payload: {
        mode,
        todo: randomTodo,
      }
    };

    const reducerReturnValue = todoReducer(todoInitialState, action);
    expect(reducerReturnValue.mode).toBe(mode);
    expect(reducerReturnValue.selectedTodo).toBe(randomTodo);
    expect(reducerReturnValue.content).toBe(randomTodo.title);
  });

  it('should handle SET_TODO_MODE edit -> add', () => {
    const mode = 'add';
    const randomTodo = createRandomTodo('set todo mode add');
    const action = {
      type: ActionTypes.SET_TODO_MODE,
      payload: {
        mode,
        todo: randomTodo,
      }
    };

    const reducerReturnValue = todoReducer(todoInitialState, action);
    expect(reducerReturnValue.mode).toBe(mode);
    expect(reducerReturnValue.selectedTodo).toBe(undefined);
    expect(reducerReturnValue.content).toBe('');
  });

  it('should handle TICK_TODO [Check case]', () => {
    const randomTodo = createRandomTodo('tick todo');
    const action = {
      type: ActionTypes.TICK_TODO,
      payload: { todo: randomTodo }
    };

    const reducerReturnValue = todoReducer(todoInitialState, action);
    const isExisted = !!reducerReturnValue.deletingTodos[randomTodo.id];
    expect(isExisted).toBe(true);
  });

  it('should handle TICK_TODO [Uncheck case]', () => {
    const randomTodo = createRandomTodo('tick todo');
    const action = {
      type: ActionTypes.TICK_TODO,
      payload: { todo: randomTodo }
    };

    const intialState: TodoState = {
      ...todoInitialState,
      deletingTodos: arrayToMap<Todo>('id', createRandomTodos())
    };

    const reducerReturnValue = todoReducer(intialState, action);
    const isExisted = !!reducerReturnValue.deletingTodos[randomTodo.id];
    expect(isExisted).toBe(false);
  });

  it('should handle DELETE_TODOS_SUCCESS', () => {
    const record = arrayToMap<Todo>('id', createRandomTodos(4));
    const keys = Object.keys(record);

    const action = {
      type: ActionTypes.DELETE_TODOS_SUCCESS,
      payload: { todoRecord: record }
    };

    const randomTodos = arrayToMap<Todo>('id', createRandomTodos(7));
    const randomDeletingTodos = arrayToMap<Todo>('id', createRandomTodos(2));

    const intialState: TodoState = {
      ...todoInitialState,
      todos: randomTodos,
      deletingTodos: randomDeletingTodos,
    };

    const reducerReturnValue = todoReducer(intialState, action);
    const unsetTodos = update(randomTodos, { $unset: keys });
    const unsetDeletingTodos = update(randomDeletingTodos, { $unset: keys });
    expect(reducerReturnValue.todos).toEqual(unsetTodos);
    expect(reducerReturnValue.deletingTodos).toEqual(unsetDeletingTodos);
  });
});