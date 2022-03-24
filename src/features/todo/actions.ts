import { EditMode, TodoID } from './types.d';

import ActionTypes from './actionTypes';
import { AppError } from './../../types/AppError.d';
import { Todo } from './types.d';
import { action } from 'typesafe-actions';

/**
 * Action to create todo
 * @param content: string;
 */
export const createTodo = (content: string) => {
  return action(ActionTypes.CREATE_TODO, { content });
};

export const createTodoSuccess = (todo: Todo) => {
  return action(ActionTypes.CREATE_TODO_SUCCESS, { todo });
};

export const createTodoError = (error: AppError) => {
  return action(ActionTypes.CREATE_TODO_ERROR, { error });
};

/**
 * Action to update todo
 * @param todo: Todo;
 */
export const updateTodo = (todo: Todo) => {
  return action(ActionTypes.UPDATE_TODO, { todo });
};

export const updateTodoSuccess = (todo: Todo) => {
  return action(ActionTypes.UPDATE_TODO_SUCCESS, { todo });
};

export const updateTodoError = (error: AppError) => {
  return action(ActionTypes.UPDATE_TODO_ERROR, { error });
};

/**
 * Action to update content
 * @param content: string;
 */
export const changeTodoContent = (content: string) => {
  return action(ActionTypes.CHANGE_TODO_CONTENT, { content });
};

/**
 * Action to change edit mode
 * @param mode: EditMode;
 * @param todo: Todo | undefined
 */
export const setTodoMode = (mode: EditMode, todo?: Todo) => {
  return action(ActionTypes.SET_TODO_MODE, { mode, todo });
};

/**
 * Action to delete todos
 * @param todos: Todo[];
 */
export const deleteTodos = (todos: Todo[]) => {
  return action(ActionTypes.DELETE_TODOS, { todos });
};

export const deleteTodosSuccess = (todoRecord: Record<TodoID, Todo>) => {
  return action(ActionTypes.DELETE_TODOS_SUCCESS, { todoRecord });
};

export const deleteTodosError = (error: AppError) => {
  return action(ActionTypes.DELETE_TODOS_ERROR, { error });
};

/**
 * Action to tick todo
 * @param todo: Todo;
 */
export const tickTodo = (todo: Todo) => {
  return action(ActionTypes.TICK_TODO, { todo });
};