import { AppError } from './../types/AppError.d';
import { put } from 'redux-saga/effects';

export function* handleSagaError(err: unknown, yieldErrorFunction: (error: AppError) => ({ type: string, payload: { error: AppError }})) {
  if (err instanceof Error) {
    yield put(yieldErrorFunction({
      messages: [err.message]
    }));
  }
}

