import { TodoActions, TodoState } from './types';

import ActionTypes from './actionTypes';
import update from 'immutability-helper';

export const initialState: TodoState = {
  todos: {},
  isLoading: false,
  error: undefined,
  mode: 'add',
  content: '',
};

export default function todoReducer(
  state: TodoState = initialState,
  action: TodoActions
): TodoState {
  switch (action.type) {
    case ActionTypes.UPDATE_TODO:
    case ActionTypes.CREATE_TODO: {
      return {
        ...state,
        isLoading: true,
        error: undefined
      };
    }
    case ActionTypes.UPDATE_TODO_SUCCESS:
    case ActionTypes.CREATE_TODO_SUCCESS: {
      const { todo } = action.payload;
      const todoRecord = { [todo.id]: todo };
      return {
        ...state,
        todos: (state.todos &&
          update(state.todos, {
            $merge: todoRecord
          } ?? todoRecord)
        ),
        isLoading: false
      };
    }
    case ActionTypes.UPDATE_TODO_ERROR:
    case ActionTypes.CREATE_TODO_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error
      };
    }
    case ActionTypes.CHANGE_TODO_CONTENT: {
      const { content } = action.payload;
      return {
        ...state,
        content,
      };
    }
    case ActionTypes.SET_TODO_MODE: {
      const { mode } = action.payload;
      return {
        ...state,
        mode
      };
    }
    default:
      return state;
  }
}