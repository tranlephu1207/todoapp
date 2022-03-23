import ActionTypes from './actionTypes';
import { AppError } from './../../types/AppError.d';
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

