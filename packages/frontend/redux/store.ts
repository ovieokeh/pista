import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
import { AuthState, BudgetState } from './types';

const middlewares = [thunk];
export interface iState {
  auth: AuthState;
  budget: BudgetState;
}
export const baseState: iState = {
  auth: {
    error: null,
    loading: false,
    user: null,
    token: ''
  },
  budget: {
    budget: null,
    loading: false,
    error: null
  }
};
const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['auth']
};

export const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
const persistedReducer = persistReducer(persistConfig, rootReducer);

export function initializeStore(initialState: iState) {
  return createStore(persistedReducer, initialState, enhancer);
}
