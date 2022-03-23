import { applyMiddleware, compose, createStore } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMdiddleware from '@redux-saga/core';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import persistStore from 'redux-persist/es/persistStore';
import rootReducer from './reducer';
import rootSaga from './saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['authentication']
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const sagaMiddleware = createSagaMdiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

