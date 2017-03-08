import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { auth } from './reducers/auth-reducer';
import { post } from './reducers/post-reducer';

const rootReducer = combineReducers({
  auth,
  post
});

export const rootStore = compose(
  applyMiddleware(thunkMiddleware)
)(createStore)(rootReducer);
