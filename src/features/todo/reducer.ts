import { Todo, TodoActions, TodoID, TodoState } from './types';

import ActionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
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

function todoReducer(
  state: TodoState = todoInitialState,
  action: TodoActions
): TodoState {
  switch (action.type) {
    case ActionTypes.UPDATE_TODO:
    case ActionTypes.CREATE_TODO:
    case ActionTypes.DELETE_TODOS: {
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
    case ActionTypes.CREATE_TODO_ERROR:
    case ActionTypes.DELETE_TODOS_ERROR: {
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
        /**
         * Always assign selectedTodo to undefined
         * and content to empty string
         * when mode set to add, otherwise todo is
         * required in order to set mode to edit.
         * Content will be todo's title.
         */
        selectedTodo: mode === 'add' ? undefined : todo,
        content: mode === 'add' ? '' : (todo?.title ?? state.content)
      };
    }
    case ActionTypes.TICK_TODO: {
      const { todo } = action.payload;
      const record: Record<TodoID, Todo> = { [todo.id]: todo };
      return {
        ...state,
        /**
         * Merge todo's record to current deletingTodos if
         * todo's id is not found in deletingTodos's keys.
         * Vice versa, remove record which has key is todo's id
         * from deletingTodos.
         */
        deletingTodos: (state.deletingTodos ?
          update(state.deletingTodos, 
            state.deletingTodos[todo.id] ? 
              { $unset: [todo.id] }
              :
              { $merge: record })
          : record)
      };
    }
    case ActionTypes.DELETE_TODOS_SUCCESS: {
      const { todoRecord } = action.payload;
      const keys = Object.keys(todoRecord);
      return {
        ...state,
        todos: (state.todos ?
          update(state.todos ?? {}, {
            $unset: keys
          })
          : {}),
        /**
         * Remember to remove from deletingTodos
         * all todos that have id found in keys
         * to untick/uncheck the corresponding TodoViews
         */
        deletingTodos: (state.deletingTodos ?
          update(state.deletingTodos, {
            $unset: keys
          })
          : {})
      };
    }
    default:
      return state;
  }
}

const todoPersistConfig = {
  key: 'todo',
  storage: AsyncStorage,
  whitelist: ['todos']
};

export default persistReducer(todoPersistConfig, todoReducer);