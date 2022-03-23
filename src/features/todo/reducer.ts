import { Todo, TodoActions, TodoID, TodoState } from './types';

import ActionTypes from './actionTypes';
import update from 'immutability-helper';

export const todoInitialState: TodoState = {
  todos: {},
  isLoading: false,
  error: undefined,
  mode: 'add',
  content: '',
  selectedTodo: undefined,
  deletingTodos: {},
};

export default function todoReducer(
  state: TodoState = todoInitialState,
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
        isLoading: false,
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
      const { mode, todo } = action.payload;
      return {
        ...state,
        mode,
        selectedTodo: mode === 'add' ? undefined : todo,
        content: mode === 'add' ? '' : (todo?.title ?? state.content)
      };
    }
    case ActionTypes.TICK_TODO: {
      const { todo } = action.payload;
      const record: Record<TodoID, Todo> = { [todo.id]: todo };
      return {
        ...state,
        deletingTodos: (state.deletingTodos ?
          update(state.deletingTodos, 
            state.deletingTodos[todo.id] ? 
              { $unset: [todo.id] }
              :
              { $merge: record })
          : record)
      };
    }
    case ActionTypes.DELETE_TODOS: {
      return {
        ...state,
        error: undefined,
      };
    }
    case ActionTypes.DELETE_TODOS_SUCCESS: {
      const { todoRecord } = action.payload;
      const keys = Object.keys(todoRecord);
      return {
        ...state,
        todos: (state.todos ?
          update(state.todos, {
            $unset: keys
          })
          : state.todos),
        deletingTodos: (state.deletingTodos ?
          update(state.deletingTodos, {
            $unset: keys
          })
          : state.deletingTodos)
      };
    }
    case ActionTypes.DELETE_TODOS_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    default:
      return state;
  }
}