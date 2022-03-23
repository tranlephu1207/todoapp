import { applyMiddleware, compose, createStore } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMdiddleware from '@redux-saga/core';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import persistStore from 'redux-persist/es/persistStore';
import rootReducer from './reducer';
import rootSaga from './saga';

declare namespace window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const sagaMiddleware = createSagaMdiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({}) || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

