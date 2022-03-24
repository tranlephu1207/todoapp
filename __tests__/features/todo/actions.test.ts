import * as actions from '@features/todo/actions';

import ActionTypes from '@features/todo/actionTypes';
import { Todo } from '@root/src/features';
import { arrayToMap } from '@utils';
import { createRandomTodos } from './../../../src/utils/TestUtils';
import { generateTodo } from '@root/src/utils';

describe('todoActions', () => {
  it('should test CREATE_TODO', () => {
    const content = 'create todo';
    const actionReturnValue = actions.createTodo(content);

    expect(actionReturnValue.type).toEqual(ActionTypes.CREATE_TODO);
    expect(actionReturnValue.payload.content).toEqual(content);
  });

  it('should test CREATE_TODO_SUCCESS', () => {
    const randomTodo = generateTodo('create todo');
    const actionReturnValue = actions.createTodoSuccess(randomTodo);

    expect(actionReturnValue.type).toEqual(ActionTypes.CREATE_TODO_SUCCESS);
    expect(actionReturnValue.payload.todo).toEqual(randomTodo);
  });

  it('should test CREATE_TODO_ERROR', () => {
    const error = { messages: ['create todo error'] };
    const actionReturnValue = actions.createTodoError(error);

    expect(actionReturnValue.type).toEqual(ActionTypes.CREATE_TODO_ERROR);
    expect(actionReturnValue.payload.error).toEqual(error);
  });

  it('should test UPDATE_TODO', () => {
    const randomTodo = generateTodo('update todo');
    const actionReturnValue = actions.updateTodo(randomTodo);

    expect(actionReturnValue.type).toEqual(ActionTypes.UPDATE_TODO);
    expect(actionReturnValue.payload.todo).toEqual(randomTodo);
  });

  it('should test UPDATE_TODO_SUCCESS', () => {
    const randomTodo = generateTodo('update todo');
    const actionReturnValue = actions.updateTodoSuccess(randomTodo);

    expect(actionReturnValue.type).toEqual(ActionTypes.UPDATE_TODO_SUCCESS);
    expect(actionReturnValue.payload.todo).toEqual(randomTodo);
  });

  it('should test UPDATE_TODO_ERROR', () => {
    const error = { messages: ['update todo error'] };
    const actionReturnValue = actions.updateTodoError(error);

    expect(actionReturnValue.type).toEqual(ActionTypes.UPDATE_TODO_ERROR);
    expect(actionReturnValue.payload.error).toEqual(error);
  });

  it('should test CHANGE_TODO_CONTENT', () => {
    const content = 'change todo content';
    const actionReturnValue = actions.changeTodoContent(content);

    expect(actionReturnValue.type).toEqual(ActionTypes.CHANGE_TODO_CONTENT);
    expect(actionReturnValue.payload.content).toEqual(content);
  });

  it('should test SET_TODO_MODE', () => {
    const mode = 'add';
    const randomTodo = generateTodo('set todo mode');
    const actionReturnValue = actions.setTodoMode(mode, randomTodo);

    expect(actionReturnValue.type).toEqual(ActionTypes.SET_TODO_MODE);
    expect(actionReturnValue.payload).toEqual({ mode, todo: randomTodo });
  });

  it('should test DELETE_TODOS', () => {
    const randomTodos = createRandomTodos();
    const actionReturnValue = actions.deleteTodos(randomTodos);

    expect(actionReturnValue.type).toEqual(ActionTypes.DELETE_TODOS);
    expect(actionReturnValue.payload.todos).toEqual(randomTodos);
  });

  it('should test DELETE_TODOS_SUCCESS', () => {
    const randomTodos = createRandomTodos();
    const record = arrayToMap<Todo>('id', randomTodos);
    const actionReturnValue = actions.deleteTodosSuccess(record);

    expect(actionReturnValue.type).toEqual(ActionTypes.DELETE_TODOS_SUCCESS);
    expect(actionReturnValue.payload.todoRecord).toEqual(record);
  });

  it('should test DELETE_TODOS_ERROR', () => {
    const error = { messages: ['delete todos error'] };
    const actionReturnValue = actions.deleteTodosError(error);

    expect(actionReturnValue.type).toEqual(ActionTypes.DELETE_TODOS_ERROR);
    expect(actionReturnValue.payload.error).toEqual(error);
  });

  it('should test TICK_TODO', () => {
    const randomTodo = generateTodo('tick todo');
    const actionReturnValue = actions.tickTodo(randomTodo);

    expect(actionReturnValue.type).toEqual(ActionTypes.TICK_TODO);
    expect(actionReturnValue.payload.todo).toEqual(randomTodo);
  });
});