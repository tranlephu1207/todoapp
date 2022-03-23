import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AppError } from '@types';

export type TodoID = string;

export interface Todo {
  id: TodoID;
  title: string;
  createdAt: number;
}

export interface TodoState {
  todos: Record<TodoID, Todo>;
  isLoading: boolean;
  error?: AppError;
}

export type TodoActions = ActionType<typeof actions>;
