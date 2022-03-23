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
