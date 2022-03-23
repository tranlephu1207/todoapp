import ActionTypes from './actionTypes';
import { AppError } from './../../types/AppError.d';
import { EditMode } from './types.d';
import { Todo } from './types';
import { action } from 'typesafe-actions';

export const createTodo = (content: string) => {
  return action(ActionTypes.CREATE_TODO, { content });
};

export const createTodoSuccess = (todo: Todo) => {
  return action(ActionTypes.CREATE_TODO_SUCCESS, { todo });
};

export const createTodoError = (error: AppError) => {
  return action(ActionTypes.CREATE_TODO_ERROR, { error });
};

export const updateTodo = (todo: Todo) => {
  return action(ActionTypes.UPDATE_TODO, { todo });
};

export const updateTodoSuccess = (todo: Todo) => {
  return action(ActionTypes.UPDATE_TODO_SUCCESS, { todo });
};

export const updateTodoError = (error: AppError) => {
  return action(ActionTypes.UPDATE_TODO_ERROR, { error });
};

export const changeTodoContent = (content: string) => {
  return action(ActionTypes.CHANGE_TODO_CONTENT, { content });
};

export const setTodoMode = (mode: EditMode) => {
  return action(ActionTypes.SET_TODO_MODE, { mode });
};
