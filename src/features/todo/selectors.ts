import { ApplicationRootState } from '@types';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const todoSelector = (state: ApplicationRootState) => {
  return state.todo ?? initialState;
};

export const selectTodos = createSelector(
  todoSelector,
  (state) => Object.values(state.todos) ?? []
);

export const selectTodosLoading = createSelector(
  todoSelector,
  (state) => state.isLoading
);

export const selectTodosError = createSelector(
  todoSelector,
  (state) => state.error
);

export const selectTodoEditMode = createSelector(
  todoSelector,
  (state) => state.mode
);

export const selectTodoContent = createSelector(
  todoSelector,
  (state) => state.content
);

export const selectSelectedTodo = createSelector(
  todoSelector,
  (state) => state.selectedTodo
);

export const selectDeletingTodos = createSelector(
  todoSelector,
  (state) => ({
    ids: Object.keys(state.deletingTodos),
    todos: Object.values(state.deletingTodos),
  })
);

export const selectDeletingTodoRecord = createSelector(
  todoSelector,
  (state) => state.deletingTodos
);
