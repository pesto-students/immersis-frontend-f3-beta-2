import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { RootReducer } from '../reducers';

export const store = createStore(RootReducer, applyMiddleware(thunk));
