import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AppError } from '@types';

export type TodoID = string;

export type EditMode = 'add' | 'edit';

export interface Todo {
  id: TodoID;
  title: string;
  createdAt: number;
}

export interface TodoState {
  todos: Record<TodoID, Todo>;
  isLoading: boolean;
  error?: AppError;

  mode: EditMode;
  selectedTodo?: Todo;
  content: string;

  deletingTodos: Record<TodoID, Todo>;
}

export type TodoActions = ActionType<typeof actions>;
